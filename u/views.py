# from django.core.mail import send_mail # to access send_mail function
# from django.core.exceptions import PermissionDenied
# from django.conf import settings

# from os.path import basename
# from scikits.audiolab import wavread, wavwrite
# from scipy import vstack
from django.shortcuts import render, redirect, get_object_or_404 # Standard view rendering
from django.views.generic import View # Standard View class
from django.contrib import messages  # for success and other message
from django.http import HttpResponse
from django.core.urlresolvers import reverse_lazy, reverse
from django.views.generic.edit import FormView, DeleteView, CreateView
from django.conf import settings

from .forms import UMediaUploadForm
from .models import UMusic, UMedia

import json
import StringIO
import wave
from algorythm import getwavs

import logging
# import os
try:
    import cloudstorage as gcs
except:
    pass
# import webapp2
# from google.appengine.api import app_identity

##GCS Storage bucket info
bucket_name = 'newjack-steameng.appspot.com'
bucket = '/' + bucket_name


class DeleteSong(View):
    def post(self, request, song_id):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        song = get_object_or_404(UMusic, user=request.user, id=song_id )
        song_title = song.song_title
        song.delete()

        messages.success(request, "Song: {} Deleted".format(song_title))
        return redirect('u:Home')

    def get(self, request, song_id):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        song = get_object_or_404(UMusic, user=request.user, id=song_id)
        context = {
            'song': song,
        }
        return render(request, 'u/song_confirm_delete.html', context)


class DeleteSongFile(View):
    '''Deletes GCS FILE'''
    pass

def playsong(request, song_id, song_seed):
    '''Grabs current song to get json.
     Gets seed from last page seed value and magic'''

    song = get_object_or_404(UMusic, user=request.user, id=song_id)
    song_json = json.loads(json.loads(song.song_json))

    inFiles = getwavs(song_json, song_seed) # get paths from algorythm

    if settings.INPRODUCTION:
        songData = ""
        for inFile in inFiles:
            file = gcs.open(inFile)
            songData += file.read()
            file.close()
    else:
        songData = ""
        for inFile in inFiles:
            file = open(inFile,"rb")
            songData += file.read()
            file.close()

    return HttpResponse(songData, content_type='audio/mpeg')



class UHome(View):
    '''UserHomePage'''
    def get(self, request):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")

        umediauploadform = UMediaUploadForm()
        songs = UMusic.objects.filter(user=request.user)
        songfiles = UMedia.objects.filter(user=request.user)

        context= {
            'umediauploadform': umediauploadform,
            'songs': songs,
            'songfiles': songfiles,
            }
        return render(request, "u/home.html", context)



class USong(View):
    '''Gets the requested Song Page'''
    def get(self, request, song_id):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        umediauploadform = UMediaUploadForm()
        song = get_object_or_404(UMusic, user=request.user, id=song_id)
        song_json = json.loads(song.song_json)
        songfiles = UMedia.objects.filter(user=request.user)

        context= {
            'umediauploadform': umediauploadform,
            'song': song,
            'song_json': song_json,
            'songfiles': songfiles,
            }
        return render(request, "u/usong.html", context)



class USongNew(View):
    '''Creates a Blank Template '''

    def get(self, request):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        umediauploadform = UMediaUploadForm()
        songfiles = UMedia.objects.filter(user=request.user)

        context= {
            'umediauploadform': umediauploadform,
            'songfiles': songfiles,
            }
        return render(request, "u/usongnew.html", context)


class USongShare(View):
    '''Gets the requested Song Page'''

    def get(self, request, author, song_id):
        try:
            song = get_object_or_404(UMusic, id=song_id) # Replace with slug field
        except UMusic.DoesNotExist:
            messages.error(request, 'notfound')
            return redirect('u:UHome')

        if song.can_share:
            song_json = song.song_json

            context= {
                'song': song,
                'song_json': song_json,
                }
            return render(request, "u/usongshare.html", context)
        else:
            messages.warning(request, 'This song is not Public')
            return redirect('dsx:Home')


class UCanShare(View):
    '''Grabs current song to get json.
     Gets seed from last page seed value and magic'''
    def post(self, request, song_id):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        if request.POST['canshare'] == 'public':
            try:
                instance = UMusic.objects.get(id=song_id, user=request.user)
                instance.can_share = True
                instance.save()

                messages.success(request, "Public Share")
                return redirect('u:USong', song_id=instance.id)
            # Create if doesn't exist
            except UMusic.DoesNotExist:
                messages.error(request, 'error in request')
                return redirect('u:USong', song_id=song_id)
        if request.POST['canshare'] == 'private':
            try:
                instance = UMusic.objects.get(id=song_id, user=request.user)
                instance.can_share = False
                instance.save()

                messages.success(request, "Private Share")
                return redirect('u:USong', song_id=instance.id)
            # Create if doesn't exist
            except UMusic.DoesNotExist:
                messages.error(request, 'error in request')
                return redirect('u:USong', song_id=song_id)

        return redirect('u:USong', song_id=song_id)
        # messages.success(request, 'go nuts')
        # return redirect('u:USong', song_id=instance.id)




class SaveSong(View):
    '''Saves Song and either Creates or Updates song in DB'''

    def post(self, request):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        song_title = request.POST['savesongtitle']
        song_json = json.dumps(request.POST['savejson'])
        song_seed = request.POST['saveseed']
        # Update
        try:
            instance = UMusic.objects.get(song_title=song_title, user=request.user)
            instance.song_json = song_json
            instance.song_seed = song_seed
            instance.save()

        # Create if doesn't exist
        except UMusic.DoesNotExist:
            instance = UMusic(song_title=song_title, song_json=song_json, song_seed=song_seed, user=request.user)
            instance.save()

        return HttpResponse()
        # return redirect('u:USong', song_id=instance.id)



class SaveNewSong(View):
    '''Saves Song and either Creates or Updates song in DB'''

    def post(self, request):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        song_title = request.POST['savesongtitle']
        song_json = json.dumps(request.POST['savejson'])
        song_seed = request.POST['saveseed']
        # Update
        try:
            instance = UMusic.objects.get(song_title=song_title, user=request.user)
            instance.song_json = song_json
            instance.song_seed = song_seed
            instance.save()

            messages.success(request, "Song Updated")

        # Create if doesn't exist
        except UMusic.DoesNotExist:
            instance = UMusic(song_title=song_title, song_json=song_json, song_seed=song_seed, user=request.user)
            instance.save()

            messages.success(request, "Song Saved")
        return redirect('u:USong', song_id=instance.id)


class UploadSongFile(View):
    '''Multi-file Upload Handler'''
    def post(self, request):
        if not request.user.is_authenticated():
            messages.info(request, "You have to Login")
            return redirect("Login")
        form = UMediaUploadForm(request.POST, request.FILES)
        if form.is_valid():
            files = request.FILES.getlist('file_field')
            if settings.INPRODUCTION:
                write_retry_params = gcs.RetryParams(backoff_factor=1.1)
            for (i, song_file) in enumerate(files):
                try:
                    if settings.INPRODUCTION:
                        song_name = str(request.user) + '/' + song_file.name
                        file_path = bucket + '/' + song_name
                        # write_retry_params = gcs.RetryParams(backoff_factor=1.1)
                        # song_name = str(request.user) + '/' + song_file.name
                        # file_path = bucket + '/' + song_name

                        instance = UMedia(song_file=song_name, user=request.user)
                        instance.save()

                        #### Could put a catch statment here and in the exception
                            # delete the record in SQL that you just entered
                        obj = song_file.read()
                        gcs_file = gcs.open(file_path, 'w', content_type='audio/x-mpeg', retry_params=write_retry_params)  # audio/x-wav
                        gcs_file.write(obj)
                        gcs_file.close()
                        messages.success(request, '{} uploaded'.format(song_file.name))
                    else:
                        song_file = UMedia(song_file=song_file, user=request.user)
                        song_file.save()
                        messages.success(request, 'File(s) Uploaded')
                except:
                    # messages.warning(request, '{} already exists; upload ignored'.format(song_file.name))
                    messages.warning(request, 'upload ignored')

            return redirect("u:Home")
        messages.error(request, 'Form not valid')
        return redirect("u:Home")
