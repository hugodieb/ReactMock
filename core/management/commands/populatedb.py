from django.core.management.base import BaseCommand
from ..utils.random_utils import (
    create_users_and_profiles,
    create_templates,
    create_discount
    )


class Command(BaseCommand):
    help = 'Populate database with test objects'
    templates = ['electro', 'komoto', 'rapid-food', 'school', 'shopmax', 'vegefoods']

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        for msg in create_users_and_profiles(10):
            self.stdout.write(msg)
        for msg in create_templates(self.templates):
            self.stdout.write(msg)
        for msg in create_discount():
            self.stdout.write(msg)
