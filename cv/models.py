from django.db import models


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
