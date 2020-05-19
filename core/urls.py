from django.urls import path
from core import views, views_auth

urlpatterns = [
    path('api/whoami', views_auth.whoami),
    path('api/login', views_auth.login),
    path('api/logout', views_auth.logout),

    #Templates
    path('api/templates', views.get_templates),
    path('api/template', views.template_detail),
]