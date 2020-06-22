from django.http.response import JsonResponse
from core.service import template_svc
from core.models import Template, TemplateImage


def get_templates(request):
    templates = Template.objects.all()
    temp_list = []
    for temp in templates:
        image = temp.images.all()
        temp_dict = temp.to_dict_json()
        temp_dict['image'] = image[0].originals if image else ''
        temp_list.append(temp_dict)
    return JsonResponse(temp_list, safe=False)


def template_detail(request):
    template_id = request.GET['id'] if 'id' in request.GET else None
    template_title = request.GET['name'] if 'name' in request.GET else None
    detail = template_svc.template_detail(template_id, template_title)
    if not detail:
        return JsonResponse({}, status=404)
    return JsonResponse(detail, safe=False)
