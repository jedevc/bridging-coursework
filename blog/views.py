from rest_framework import viewsets
from django.utils import timezone

from django.contrib.auth.models import User
from .models import Post
from .serializers import UserSerializer, PostSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        posts = Post.objects.filter(published_date__lte=timezone.now())
        return posts.order_by('-published_date')
