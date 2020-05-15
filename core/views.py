from django.http.response import JsonResponse

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