"""ds_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
#from django.contrib.auth.decorators import login_required
from django.conf.urls.static import static # if error this might be it
from django.conf import settings

import views


##############################  URLS  #################################

urlpatterns = [

    url(r'^$', views.UHome.as_view(), name='Home'),
    url(r'^song/(?P<song_id>\d+)/$', views.USong.as_view(), name='USong'),
    url(r'^song/new/$', views.USongNew.as_view(), name='USongNew'),
    url(r'^song/share/(?P<author>[\w-]+)/(?P<song_id>\d+)/$', views.USongShare.as_view(), name='USongShare'),
    url(r'^can/share/(?P<song_id>\d+)/$', views.UCanShare.as_view(), name='UCanShare'),
    url(r'^song/delete/(?P<song_id>\d+)/$', views.DeleteSong.as_view(), name='DeleteSong'),
    url(r'^upload/$', views.UploadSongFile.as_view(), name='UploadSongFile'),
    url(r'^song/save/$', views.SaveSong.as_view(), name='SaveSong'),
    url(r'^new/song/save/$', views.SaveNewSong.as_view(), name='SaveNewSong'),
    url(r'^play/(?P<song_id>\d+)/(?P<song_seed>\d+)/$', views.playsong, name='PlaySong'),

]


##############################  DEBUG MODE  #################################

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


##############################  PRODUCTION  #################################

if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # urlpatterns += patterns('',
    #     (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    # )


#### GRAVEYARD
    # url(r'^old/$', views.UHomeOld.as_view(), name='HomeOld'),
    # url(r'^uploadold/$', views.Upload.as_view(), name='Upload'),