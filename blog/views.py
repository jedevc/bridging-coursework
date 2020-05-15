from rest_framework import viewsets
from django.utils import timezone
from django.contrib.auth.models import User
from .serializers import PostSerializer, UserSerializer
from .models import Post


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    serializer_class = PostSerializer
