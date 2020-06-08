from ...models import (
    Profile, User, Template,
    Discount, TemplateImage)
from django.conf import settings
from django.core.files import File
import os
import unicodedata
import random
import string
from faker import Factory

fake = Factory.create()


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


def create_fake_user():
    first_name = fake.first_name()
    last_name = fake.last_name()
    username = (first_name + last_name).lower()
    email = generate_email(first_name, last_name)
    cell_phone = generate_phone()
    cpf = generate_cpf()
    user = User.objects.create_user(username=username,
                                    first_name=first_name,
                                    last_name=last_name,
                                    email=email,
                                    password='password')
    user.is_active = True
    user.save()
    profile = Profile.objects.create(
        user=user,
        cell_phone=cell_phone,
        cpf=cpf
    )

    return profile


def create_fake_template(dummy):
    title = dummy
    description = fake.text()
    price = generate_price()
    template = Template.objects.create(
        title=title,
        price=price,
        description=description
    )
    create_images_template(template)

    return template


def create_fake_template_images():
    image = TemplateImage.objects.create(
        template='',
        thumbnails='',
        originals=''
    )

    return image


def create_fake_discount():
    name = fake.street_suffix()
    discount = Discount.objects.create(
        name=name,
        discount_value='5.00'
    )

    return discount


def generate_email(first_name, last_name):
    _first = unicodedata.normalize('NFD', first_name).encode('ascii', 'ignore')
    _last = unicodedata.normalize('NFD', last_name).encode('ascii', 'ignore')
    return '%s.%s@example.com' % (
        _first.lower().decode('utf-8'), _last.lower().decode('utf-8'))


def generate_cpf():
    cpf = [random.randint(0, 9) for _ in range(9)]
    for _ in range(2):
        val = sum([(len(cpf) + 1 - i) * v for i, v in enumerate(cpf)]) % 11
        cpf.append(11 - val if val > 1 else 0)

    return '%s%s%s%s%s%s%s%s%s%s%s' % tuple(cpf)


def generate_phone():
    # 11 digitos(12988347624)
    return '12'+''.join(random.choice(string.digits) for _ in range(9))


def generate_price():
    value = ''.join(random.choice(string.digits) for _ in range(4))
    value = int(value) / 100
    return value


def create_images_template(template):
    title = template.title
    static_path = '/images/static/placeholders'
    originals_dir = '%s/%s/%s' % (static_path, title, 'originals')
    originals_path = os.path.join(settings.BASE_DIR, originals_dir)
    thumbnails_dir = '%s/%s/%s' % (static_path, title, 'thumbnails')
    thumbnails_path = os.path.join(settings.BASE_DIR, thumbnails_dir)
    for index in range(1, 7):
        originals_root = '%s/%s' % (originals_path, title + str(index) + '.png')
        thumbnails_root = '%s/%s' % (thumbnails_path, title + str(index) + '.png')
        # ft = File(open(thumbnails_root, 'rb'))
        # fo = File(open(originals_root, 'rb'))
        TemplateImage(
            originals=originals_root,
            thumbnails=thumbnails_root,
            template=template
        ).save()
