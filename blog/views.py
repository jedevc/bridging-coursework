from rest_framework import viewsets
from django.utils import timezone

from django.contrib.auth.models import User
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        # auth-ed users can view everything, but anon can only view published posts
        if self.request.user and self.request.user.has_perm('blog.change_post'):
            posts = Post.objects.all()
        else:
            posts = Post.objects.filter(published_date__lte=timezone.now())

        return posts.order_by('-published_date')
