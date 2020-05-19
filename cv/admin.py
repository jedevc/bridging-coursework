from django.contrib import admin

from .models import Education, Work, Volunteering, Project, Award

admin.site.register(Education)
admin.site.register(Work)
admin.site.register(Volunteering)
admin.site.register(Project)
admin.site.register(Award)
