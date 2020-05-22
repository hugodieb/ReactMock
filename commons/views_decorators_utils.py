from functools import wraps
import json
from django.http.response import HttpResponse
from django.core.exceptions import ValidationError


def ajax_login_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.is_active:
            return view_func(request, *args, **kwargs)
        resp = json.dumps({'not_authenticated': True})
        return HttpResponse(resp, content_type='application/json', status=401)
    return wrapper


def error_str(ex):
    if isinstance(ex, ValidationError):
        return '; '.join(ex.messages)
    else:
        return str(ex)

