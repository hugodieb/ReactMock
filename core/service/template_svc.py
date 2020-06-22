from core.models import Template
from commons.model_utils import get_or_none


def template_detail(template_id=None, template_title=None):
    template_id = template_id if not template_id else int(template_id)
    template_title = template_title
    discount = ''
    price_pay = ''

    template = get_or_none(Template, pk=template_id) if template_id else get_or_none(Template, title=template_title)
    if template:
        thumbs = template.images.all()
        thumbnails_url = [thumb.thumbnails for thumb in thumbs]
        originals_url = [thumb.originals for thumb in thumbs]
        gallery = []
        if len(thumbnails_url) > 0 and len(thumbnails_url) == len(originals_url):
            for t in range(len(thumbnails_url)):
                gallery.append({"thumbnail": thumbnails_url[t], "original": originals_url[t]})
        if template.discount.all():
            for temp in template.discount.all():
                discount = temp.discount_value\
                    if temp.discount_value == 'fixed' else round(temp.discount_value)
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
            'thumbnails': thumbnails_url,
            'originals': originals_url,
            'gallery': gallery
        }
    else:
        return None
