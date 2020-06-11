import json
from core.models import User
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures

class TestAuthApi(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.user_sheik()

    def test_whoami_api(self):
        client = Client()
        client.force_login(User.objects.get(username='sheikdog'))
        c1 = client.get('/api/whoami')
        self.assertEqual(200, c1.status_code)
        res = json.loads(c1.content.decode('utf-8'))
        self.assertNotEquals(res['user']['email'], 'asasa@ds.com')
        self.assertEquals(res['user']['email'], 'sheik@dog.com')
        self.assertEquals(res['user']['cpf'], '123456789098')

    def test_login_api(self):
        client = Client()
        r = client.post('/api/login', {'email': 'sheik@dog.com', 'password': 'sheik'})
        self.assertEquals(200, r.status_code)
        res = json.loads(r.content.decode('utf-8'))
        self.assertTrue('cpf' in res)

    def test_logout_api(self):
        client = Client()
        r = client.post('/api/logout')
        self.assertEqual(200, r.status_code)
        r = client.post('/api/whoami')
        self.assertEqual(200, r.status_code)
        res = json.loads(r.content.decode('utf-8'))
        self.assertEquals(False, res['authenticated'])
