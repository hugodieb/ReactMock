from django.core.management.base import BaseCommand
from ..utils.random_utils import create_fake_user, create_fake_template


class Command(BaseCommand):
    help = 'Populate database with test objects'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        for msg in self.create_users(10):
            self.stdout.write(msg)
        for msg in self.create_templates():
            self.stdout.write(msg)

    def create_users(how_many=5):
        for dummy in range(how_many):
            user = create_fake_user()
            yield 'User: %s' % (user.email,)

    def create_templates(how_many=5):
        for dummy in range(how_many):
            template = create_fake_template()
            yield 'Template: %s' % (template.title,)
