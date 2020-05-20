import json
from django.test.client import Client
from django.test.testcases import TestCase
from core.models import User
from core.tests import fixtures


class TestInvoiceOrde(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.user_sheik()

    def test_create_invoice_order_api(self):
        sheik = Client()
        sheik.force_login(User.objects.get(username='sheikdog'))
        c1 = sheik.post(
            '/api/create_invoice', {'template_id': '1', 'subtotal': '100.00',
                                    'total': '100.00', 'status': 'waiting',
                                    'payment_method': 'paypal'
                                    }
        )
        self.assertEquals(200, c1.status_code)
