from django.core.management.base import BaseCommand
from ..utils.random_utils import (
    create_fake_user, create_fake_template, create_fake_discount)


class Command(BaseCommand):
    help = 'Populate database with test objects'
    templates = ['electro', 'komoto', 'rapid-food', 'school', 'shopmax']

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        for msg in self.create_users_and_profiles(10):
            self.stdout.write(msg)
        for msg in self.create_templates(self.templates):
            self.stdout.write(msg)
        for msg in self.create_discount():
            self.stdout.write(msg)

    def create_users_and_profiles(how_many=5):
        for dummy in range(how_many):
            user_profile = create_fake_user()
            yield 'User: %s' % (user_profile.user.email,)

    def create_templates(how_many):
        for dummy in how_many:
            template = create_fake_template(dummy)
            yield 'Template: %s' % (template.title,)

    def create_discount(how_many=5):
        for dummy in range(how_many):
            discount = create_fake_discount()
            yield 'Discount: %s' % (discount.name,)
