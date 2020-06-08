from django.http.response import JsonResponse
from core.service import template_svc
from core.models import Template, TemplateImage


def get_templates(request):
    templates = Template.objects.all()
    temp_list = []
    for temp in templates:
        image = temp.images.all()
        for i in image:
            temp_dict = temp.to_dict_json()
            temp_dict['image'] = '/%s/%s' % ('imagens', i.originals)
            temp_list.append(temp_dict)
    return JsonResponse({'templates': temp_list})


def template_detail(request):
    template_id = request.GET['id']
    detail = template_svc.template_detail(template_id)
    if not detail:
        return JsonResponse({}, status=404)
    return JsonResponse({'template': detail}, safe=False)





