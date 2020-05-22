from core.models import Template
from commons.model_utils import get_or_none


def template_detail(template_id):
    template_id = int(template_id)
    discount = ''
    price_pay = ''
    template = get_or_none(Template, pk=template_id)
    if template:
        thumbs = template.images.all()
        thumbnails = [thumb.thumbnails.name for thumb in thumbs]
        originals = [thumb.originals.name for thumb in thumbs]
        gallery = []
        if len(thumbnails) > 0 and len(thumbnails) == len(originals):
            for t in range(len(thumbnails)):
                gallery.append({"thumbnail": thumbnails[t], "original": originals[t]})
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
            'originals': originals,
            'gallery': gallery
        }
    else:
        return None
