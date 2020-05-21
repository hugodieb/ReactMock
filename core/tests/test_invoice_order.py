import json
from django.test.client import Client
from django.test.testcases import TestCase
from core.models import User
from core.tests import fixtures

PARAMS = {'template_id': '1', 'subtotal': '100.00',
          'total': '100.00', 'status': 'waiting',
          'payment_method': 'paypal'
         }


class TestInvoiceOrde(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.user_sheik()
        fixtures.template()

    def test_fields_in_create_invoice_order_api(self):
        sheik = Client()
        sheik.force_login(User.objects.get(username='sheikdog'))
        c1 = sheik.post(
            '/api/create_invoice', {'params': json.dumps(PARAMS)}
        )
        res = json.loads(c1.content.decode('utf-8'))
        self.assertEquals(200, c1.status_code)
        self.assertTrue('id' in res['invoicePayment'])
        self.assertTrue('invoice_number' in res['invoicePayment'])
        self.assertTrue('subtotal' in res['invoicePayment'])
        self.assertTrue('total' in res['invoicePayment'])
        for field in res['invoicePayment']['items']:
            self.assertTrue('name' in field)
            self.assertTrue('description' in field)
            self.assertTrue('quantity' in field)
            self.assertTrue('price' in field)
            self.assertTrue('tax' in field)
            self.assertTrue('sku' in field)
            self.assertTrue('currency' in field)
