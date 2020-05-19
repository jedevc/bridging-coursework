from rest_framework import serializers
from .models import Education, Work, Volunteering, Project, Award


class EducationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'qualification', 'location', 'start', 'end', 'notes', 'icon']


class WorkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Work
        fields = ['id', 'name', 'role', 'start', 'end', 'notes', 'icon']


class VolunteeringSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Volunteering
        fields = ['id', 'name', 'role', 'start', 'end', 'notes', 'icon']


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'link', 'notes', 'icon']


class AwardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Award
        fields = ['id', 'name', 'giver', 'date', 'notes', 'icon']