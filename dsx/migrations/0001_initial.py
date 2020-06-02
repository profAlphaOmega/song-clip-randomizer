# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('email', models.EmailField(max_length=254, unique=True, null=True, blank=True)),
                ('message', models.TextField(verbose_name=b'Message', blank=True)),
                ('first_name', models.CharField(max_length=255, verbose_name=b'first name', blank=True)),
                ('last_name', models.CharField(max_length=255, verbose_name=b'last name', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('email', models.EmailField(max_length=254, unique=True, null=True, blank=True)),
                ('username', models.CharField(max_length=60, unique=True, null=True, blank=True)),
            ],
        ),
    ]
