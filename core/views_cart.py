from django.http.response import JsonResponse
from core.service import cart_svc
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def item_to_cart(request):
    template_id = request.POST['template_id'] if 'template_id' in request.POST else None
    token = request.COOKIES.get('cart')
    cart = cart_svc.item_to_cart(template_id, token)

    return cart

def get_item_cart(request):
    user = request.GET['user'] if 'user' in request.GET else None
    token = request.COOKIES.get('cart')
    cart = cart_svc.get_item_cart(user, token)

    return JsonResponse(cart, safe=False)
