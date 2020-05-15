import json
from core.models import User
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures

class TestAuthApi(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.user_sheik()

    def test_auth_whoami_api(self):
        client = Client()
        client.force_login(User.objects.get(username='sheikdog'))
        c1 = client.get('/api/whoami')
        self.assertEqual(200, c1.status_code)
        user = json.loads(c1.content.decode('utf-8'))
        self.assertNotEquals(user['user']['email'], 'asasa@ds.com')
        self.assertEquals(user['user']['email'], 'sheik@dog.com')
        self.assertEquals(user['user']['cpf'], '123456789098')





