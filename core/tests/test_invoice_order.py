import json
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures

class TestInvoiceOrde(TestCase):
    @classmethod
    def setUpTestData(cls):
        pass