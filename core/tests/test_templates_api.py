import json
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures
from core.models import User, Cart, Template


class TestTemplatesApi(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.user_sheik()
        fixtures.templates()

    def test_templates_api(self):
        client = Client()
        t1 = client.get('/api/templates')
        self.assertEquals(200, t1.status_code)
        res = json.loads(t1.content.decode('utf-8'))
        self.assertEqual(3, len(res))
        for r in res:
            self.assertTrue('id' in r)
            self.assertTrue('title' in r)
            self.assertTrue('sku' in r)
            self.assertTrue('price' in r)
            self.assertTrue('description' in r)

    def test_template_404_api(self):
        client = Client()
        t1 = client.get('/api/template', {'id': 10})
        self.assertEquals(404, t1.status_code)
        res = json.loads(t1.content.decode('utf-8'))
        self.assertEquals({}, res)

    def test_fields_template_detail_api(self):
        client = Client()
        t1 = client.get('/api/template', {'id': 2})
        self.assertEquals(200, t1.status_code)
        res = json.loads(t1.content.decode('utf-8'))
        self.assertTrue('id' in res)
        self.assertTrue('title' in res)
        self.assertTrue('sku' in res)
        self.assertTrue('price' in res)
        self.assertTrue('description' in res),
        self.assertTrue('discount' in res)
        self.assertTrue('thumbnails' in res)
        self.assertTrue('originals' in res)
        self.assertTrue('price_pay' in res),
        self.assertTrue('gallery' in res)

    def test_value_fields_template_detail_api(self):
        client = Client()
        t1 = client.get('/api/template', {'id': 2})
        self.assertEquals(200, t1.status_code)
        res = json.loads((t1.content.decode('utf-8')))
        self.assertEqual(2, res['id'])
        self.assertEqual('TemplateOne', res['title'])
        self.assertEqual('32.50', res['price'])
        self.assertEqual('teste template', res['description'])
        self.assertEqual(10, res['discount'])
        self.assertEqual(['/images/image1.jpg'], res['thumbnails'])
        self.assertEqual(['/images/image2.jpg'], res['originals'])
        self.assertEqual('22.00', res['price_pay'])
        self.assertEqual({'thumbnail': '/images/image1.jpg', 'original': '/images/image2.jpg'}, res['gallery'][0])

    def test_filter_template_api(self):
        client = Client()
        t = client.get('/api/template', {'name': 'TemplateOne'})
        self.assertEquals(200, t.status_code)
        res = json.loads((t.content.decode('utf-8')))
        self.assertEqual(2, res['id'])
        self.assertEqual('TemplateOne', res['title'])
        self.assertEqual('32.50', res['price'])
        self.assertEqual('teste template', res['description'])
        self.assertEqual(10, res['discount'])
        self.assertEqual(['/images/image1.jpg'], res['thumbnails'])
        self.assertEqual(['/images/image2.jpg'], res['originals'])
        self.assertEqual('22.00', res['price_pay'])
        self.assertEqual({'thumbnail': '/images/image1.jpg', 'original': '/images/image2.jpg'}, res['gallery'][0])

    def test_get_or_save_item_to_cart_api(self):
        client = Client()
        client.force_login(User.objects.get(username='sheikdog'))
        user = User.objects.get(username='sheikdog')
        template = Template.objects.get(title='TemplateOne')
        get_cart = Cart.objects.all().count()
        self.assertEqual(0, get_cart)
        c = client.post('/api/item_cart', {'user_id': user.id, 'template_id': template.id})
        self.assertEquals(200, c.status_code)
        cart = Cart.objects.get(user=user.id)
        self.assertEqual('sheikdog', cart.user.username)
        self.assertEqual('TemplateOne', cart.template.title)
        self.assertEqual('open', cart.status)

