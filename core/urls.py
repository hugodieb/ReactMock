from django.urls import path
from core import views

urlpatterns = [
    path('api/whoami', views.whoami),
    path('api/login', views.login),
    path('api/logout', views.logout),

    #Templates
    path('api/templates', views.getTemplates),
    path('api/template', views.templateDetail),
]