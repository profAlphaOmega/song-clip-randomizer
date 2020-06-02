from django.db import models
import datetime
from django.core.urlresolvers import reverse
from django.conf import settings



class Person(models.Model):
    '''Look at BaseUserManager to figure out password'''
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    creation_date = models.DateTimeField(auto_now_add=True, auto_now=False)  # only when created, never overwritten
    last_updated = models.DateTimeField(auto_now_add=False, auto_now=True)  # can be saved over
    email = models.EmailField(unique=True, blank=True, null=True)
    username = models.CharField(max_length=60, unique=True, blank=True, null=True)

    def __unicode__(self):
        return  "{}, <{}>".format(self.username, self.email)


class Contact(models.Model):
    '''Look at BaseUserManager to figure out password'''

    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    creation_date = models.DateTimeField(auto_now_add=True, auto_now=False)  # only when created, never overwritten
    last_updated = models.DateTimeField(auto_now_add=False, auto_now=True)  # can be saved over
    email = models.EmailField(unique=True, blank=True, null=True)
    message = models.TextField(verbose_name="Message", blank=True)
    first_name = models.CharField("first name", max_length=255, blank=True)
    last_name = models.CharField("last name", max_length=255, blank=True)


    def __unicode__(self):
        return  "{}, <{}>".format(self.username, self.email)



