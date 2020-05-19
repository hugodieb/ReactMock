import json
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures

class TestTemplatesApi(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.templates()

    def test_templates_api(self):
        client = Client()
        t1 = client.get('/api/templates')
        self.assertEquals(200, t1.status_code)
        res = json.loads(t1.content.decode('utf-8'))
        self.assertEqual(3, len(res['Templates']))
        for r in res['Templates']:
            self.assertTrue('id' in r)
            self.assertTrue('title' in r)
            self.assertTrue('sku' in r)
            self.assertTrue('price' in r)
            self.assertTrue('description' in r)

    def test_template_detail_api(self):
        client = Client()
        # check o price_pay value with discount type percentage or fixed
        for id in range(1, 4):
            t1 = client.get('/api/template', {'id': id})
            self.assertEquals(200, t1.status_code)
            res = json.loads(t1.content.decode('utf-8'))
            self.assertTrue('id' in res['Template'])
            self.assertTrue('title' in res['Template'])
            self.assertTrue('sku' in res['Template'])
            self.assertTrue('price' in res['Template'])
            self.assertTrue('description' in res['Template']),
            self.assertTrue('discount' in res['Template'])
            self.assertTrue('thumbnails' in res['Template'])
            self.assertTrue('originals' in res['Template'])
            self.assertTrue('price_pay' in res['Template'])