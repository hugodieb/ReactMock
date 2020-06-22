from django.db.models import Q
from commons.model_utils import get_or_none, get_template_id_or_title
from core.models import Template, User, Cart
from core.service.template_svc import template_detail


def item_cart(user_id, template_id=None, template_title=None):
    user_id = int(user_id)
    template_id = template_id if not template_id else int(template_id)
    user = get_or_none(User, pk=user_id)
    template = get_template_id_or_title(Template, template_id, template_title)
    if user and template:
        cart = Cart.objects.filter(Q(user=user) & Q(template=template) & Q(status='open'))
        if cart:
            [c.save() for c in cart]
        else:
            Cart.objects.create(user=user, template=template)

        return template_detail(template_id)

