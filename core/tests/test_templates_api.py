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
        self.assertEqual(3, len(res['templates']))
        for r in res['templates']:
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
            self.assertTrue('id' in res['template'])
            self.assertTrue('title' in res['template'])
            self.assertTrue('sku' in res['template'])
            self.assertTrue('price' in res['template'])
            self.assertTrue('description' in res['template']),
            self.assertTrue('discount' in res['template'])
            self.assertTrue('thumbnails' in res['template'])
            self.assertTrue('originals' in res['template'])
            self.assertTrue('price_pay' in res['template'])