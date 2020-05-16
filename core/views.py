from django.http.response import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
from core.models import User

AUTH_BACKEND = 'django.contrib.auth.backends.ModelBackend'

@csrf_exempt
def login(request):
    email = request.POST['email']
    password = request.POST['password']
    user = User.objects.get(email=email)
    user_dict = None
    if user is not None:
        if user.is_active and user.check_password(password):
            auth.login(request, user, backend=AUTH_BACKEND)
            user_dict = _user2dict(user)
    return JsonResponse({'user': user_dict}, safe=False)

def logout(request):
    auth.logout(request)
    return HttpResponse('{}', content_type='application/json')

def whoami(request):
    i_am = {
        'user': _user2dict(request.user),
        'authenticated': True
    } if request.user.is_authenticated else {'authenticated': False}
    return JsonResponse(i_am)


def _user2dict(user):
    d = {}
    d.update(user.profile.to_dict_json())
    return d