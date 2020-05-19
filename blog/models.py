from django.conf import settings
from django.db import models
from django.utils import timezone


class Post(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField()
    content = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title


class Education(models.Model):
    qualification = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    icon = models.CharField(max_length=32)

    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100)

    notes = models.TextField()

    def __str__(self):
        return self.qualification


class Work(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    icon = models.CharField(max_length=32)

    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100)

    notes = models.TextField()

    def __str__(self):
        return self.name


class Volunteering(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    icon = models.CharField(max_length=32)

    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100)

    notes = models.TextField()

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=200)
    link = models.URLField(max_length=100)
    icon = models.CharField(max_length=32)

    notes = models.TextField()

    def __str__(self):
        return self.name


class Award(models.Model):
    name = models.CharField(max_length=200)
    giver = models.CharField(max_length=200)
    icon = models.CharField(max_length=32)

    date = models.CharField(max_length=100)

    notes = models.TextField()

    def __str__(self):
        return self.name
