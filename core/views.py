from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def whoami(request):
    print(request.user)
    i_am = {
        'user': _user2dict(request.user),
        'authenticated': True
    } if request.user.is_authenticated else {'authenticated': False}
    return JsonResponse(i_am)


def _user2dict(user):
    d = {
        'id': user.id,
        'name': user.get_full_name(),
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'permissions': {
            'ADMIN': user.is_superuser,
            'STAFF': user.is_staff,
        }
    }
    return d