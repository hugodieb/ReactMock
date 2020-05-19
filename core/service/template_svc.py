from core.models import Template
from django.shortcuts import get_object_or_404


def template_detail(template_id):

    template = get_object_or_404(Template, pk=template_id)
    discount = template.discount.all().first().discount_value
    thumbs = template.images.all()
    thumbnails = [thumb.thumbnails.name for thumb in thumbs]
    originals = [thumb.originals.name for thumb in thumbs]

    return {
        'id': template.id,
        'title': template.title,
        'sku': template.sku,
        'price': template.price,
        'description': template.description,
        'discount': discount,
        'thumbnails': thumbnails,
        'originals': originals
    }