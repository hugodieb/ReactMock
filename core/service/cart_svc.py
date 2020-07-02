from django.http import HttpResponse
from django.db.models import Q
from commons.model_utils import get_or_none, get_template_id_or_title
from core.models import Template, User, Cart
from core.service.template_svc import template_detail
from commons.utils import random_code

COOKIE_NAME ='cart'

def item_to_cart(template_id=None, token=None):
    template_id = template_id if template_id else int(template_id)
    template = get_or_none(Template, pk=template_id)
    response = HttpResponse()
    if token is None:
        if template:
            token = random_code(32)
            Cart.objects.create(template=template, token=token)
            response.set_cookie('cart', token)
    else:
        cart = Cart.objects.get(token=token)
        if cart.template.id == template.id:
            cart.save()
        else:
            cart.template = template
            cart.save()

    return response


def get_item_cart(user, token):
    id = int(user.id) if user else None
    if token:
        cart = get_or_none(Cart, token=token)
        if cart.status == 'open':
            return template_detail(cart.template.id)
        else:
            return {}
    else:
        user = get_or_none(User, pk=id)
        if user:
            cart = Cart.objects.filter(Q(user=user) & Q(status='open'))
            return template_detail(cart.template.id)
        else:
            return {}
