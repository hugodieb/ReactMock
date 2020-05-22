from django.http.response import JsonResponse
from core.service import template_svc
from core.models import Template


def get_templates(request):
    templates = Template.objects.all()
    temp_list = []
    for temp in templates:
        temp_list.append(temp.to_dict_json())

    return JsonResponse({'templates': temp_list})


def template_detail(request):
    id = int(request.GET['id'])
    detail = template_svc.template_detail(id)
    if detail:
        return JsonResponse({'template': detail}, safe=False)
    else:
        return JsonResponse({}, status=404)




