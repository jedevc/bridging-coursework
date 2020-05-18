from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('users', views.UserViewSet, 'users')
router.register('posts', views.PostViewSet, 'posts')


urlpatterns = [
    path('', include(router.urls)),
]
