from core.models import Template
from django.shortcuts import get_object_or_404


def template_detail(template_id):
    discount = ''
    price_pay = ''
    template = get_object_or_404(Template, pk=template_id)
    thumbs = template.images.all()
    thumbnails = [thumb.thumbnails.name for thumb in thumbs]
    originals = [thumb.originals.name for thumb in thumbs]
    if template.discount.all():
        for temp in template.discount.all():
            discount = temp.discount_value
            price_pay = temp.calculate_discount_to_template()
    else:
        discount = 0
        price_pay = template.price

    return {
        'id': template.id,
        'title': template.title,
        'sku': template.sku,
        'price': template.price,
        'price_pay': price_pay,
        'description': template.description,
        'discount': discount,
        'thumbnails': thumbnails,
        'originals': originals
    }