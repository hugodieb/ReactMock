from commons.model_utils import get_or_none
from core.models import Template, User, Cart


def item_cart(user_id, template_id):
    user_id = int(user_id)
    template_id = int(template_id)
    user = get_or_none(User, pk=user_id)
    template = get_or_none(Template, pk=template_id)
    if user and template:
        cart = get_or_none(Cart, user=user)
        if cart:
            cart_open = cart.filter(status='open')
            return cart_open
        else:
            Cart.objects.create(user=user, template=template)

