from core.models import InvoiceOrder, User, Template
from commons.utils import random_invoice_number

def create_invoice_order(user_id, params):
    user = User.objects.get(pk=user_id)
    template_id = params['template_id']
    subtotal = params['subtotal']
    total = params['total']
    status = ['status']
    payment_method = params['payment_method']
    template = Template.objects.get(pk=template_id)
    order_number = random_invoice_number(8)
    invoice = InvoiceOrder.objects.create(
        user=user, template=template,
        subtotal=subtotal, total=total,
        order_number=order_number,
        status=status, payment_method=payment_method
    )

    return invoice.to_dict_json()
