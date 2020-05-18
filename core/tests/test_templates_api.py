import json
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures

class TestTemplatesApi(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.templates()

    def test_template_api(self):
        client = Client()
        t1 = client.get('/api/templates')
        self.assertEquals(200, t1.status_code)
