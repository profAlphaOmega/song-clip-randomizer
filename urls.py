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
import stage.urls
import dsx.views
import u.views
import u.urls
import dsx.urls
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls), name="admin"), # admin urls
    url(r'^accounts/', include('registration.backends.default.urls')), # registration urls
    url(r'^login/$', auth_views.login, name='Login'),

    url(r'^', include((dsx.urls, 'dsx', 'dsx'))),
    url(r'^u/', include((u.urls, 'u', 'u'))),
    url(r'^stage/', include(stage.urls, 'stage', 'stage')), # stage pages

    ]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    # urlpatterns += patterns('',
    #     (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    # )
