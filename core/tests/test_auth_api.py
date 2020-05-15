from core.models import User
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures

class TestAuthApi(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.user_sheik()

    def test_aut_api(self):
        client = Client()
        client.force_login(User.objects.get(username='sheikdog'))
        c1 = client.get('/api/whoami')
        self.assertEqual(200, c1.status_code)

    def test_login_api(self):
        pass
