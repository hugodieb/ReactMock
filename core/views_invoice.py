import json
from django.http.response import JsonResponse
from commons.views_decorators_utils import ajax_login_required
from core.service import invoice_order_svc


@ajax_login_required
def crate_invoice_order(request):
    params_dict = json.loads(request.POST['params'])
    user_id = request.user.id
    invoice = invoice_order_svc.create_invoice_order(user_id, params_dict)

    return JsonResponse({'invoicePayment': invoice}, safe=False)
