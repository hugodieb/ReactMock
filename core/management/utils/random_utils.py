from ...models import Profile, User, Template
import unicodedata
import random
import string
from faker import Factory

fake = Factory.create()


def create_fake_user():
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = generate_email(first_name, last_name)
    cell_phone = generate_phone()
    cpf = generate_cpf()
    user = User.objects.create_user(email=email, password='password')
    user.is_active = True
    user.save()
    profile = Profile.objects.create(
        user=user,
        cell_phone=cell_phone,
        cpf=cpf
    )
    profile.save()
    return user


def create_fake_template():
    title = fake.language_name()
    description = fake.text()
    price = generate_price()
    template = Template.objects.create(
        title=title,
        price=price,
        description=description
    )

    return template


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
