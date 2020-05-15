from django.urls import path
from core import views

urlpatterns = [
    path('api/whoami', views.whoami),
    path('api/login', views.login),
]