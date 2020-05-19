from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register('education', views.EducationViewSet, 'education')
router.register('work', views.WorkViewSet, 'work')
router.register('volunteer', views.VolunteeringViewSet, 'volunteer')
router.register('projects', views.ProjectsViewSet, 'projects')
router.register('awards', views.AwardsViewSet, 'awards')


urlpatterns = [
    path('', include(router.urls)),
]
