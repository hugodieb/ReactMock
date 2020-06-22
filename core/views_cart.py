from django.http.response import JsonResponse
from core.service import cart_svc

def item_to_cart(request):
    user_id = request.POST['user_id'] if 'user_id' in request.POST else None
    template_id = request.POST['template_id'] if 'template_id' in request.POST else None
    cart = cart_svc.item_cart(user_id, template_id)
    if not cart:
        return JsonResponse({}, status=404)
    return JsonResponse(cart, safe=False)
