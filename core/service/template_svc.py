from core.models import Template
from django.shortcuts import get_object_or_404

def templateDetail(template_id):

    template = get_object_or_404(Template, id=template_id)

    return  template.to_dict_json()