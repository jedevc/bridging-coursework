from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register('users', views.UserViewSet, 'users')
router.register('posts', views.PostViewSet, 'posts')

router.register('cv/education', views.EducationViewSet, 'education')
router.register('cv/work', views.WorkViewSet, 'work')
router.register('cv/volunteer', views.VolunteeringViewSet, 'volunteer')
router.register('cv/projects', views.ProjectsViewSet, 'projects')
router.register('cv/awards', views.AwardsViewSet, 'awards')


urlpatterns = [
    path('', include(router.urls)),
]
