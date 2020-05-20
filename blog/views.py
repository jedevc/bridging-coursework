from rest_framework import viewsets
from django.utils import timezone

from django.contrib.auth.models import User
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        posts = Post.objects.filter(published_date__lte=timezone.now())
        return posts.order_by('-published_date')
