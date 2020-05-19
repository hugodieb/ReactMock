from django.db import models
from django.contrib.auth.models import User
from . import DiscountValueType


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    cell_phone = models.CharField(max_length=16, null=False, blank=False)
    cpf = models.CharField(max_length=16, null=False, blank=False)
    photo_url = models.CharField(max_length=1024, null=True, blank=True)

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

    def to_dict_json(self):
        permissons = {
            'ADMIN': self.user.is_superuser,
            'STAFF': self.user.is_staff
        }
        return {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'cell_phone': self.cell_phone,
            'birth_date': self.birth_date.strftime('%Y-%m-%d') if self.birth_date else None,
            'photo_url': self.photo_url,
            'cpf': self.cpf,
            'permissions': permissons
        }

class Template(models.Model):
    title = models.CharField(max_length=256, null=False, blank=False)
    sku = models.CharField(max_length=32, unique=True, null=False, blank=False)
    price = models.DecimalField('Preço', decimal_places=2, max_digits=8)
    description = models.TextField('Descriçao', blank=True)

    def __str__(self):
        return '%s' % (self.title)

    def getTemplateImages(self):
        pass

    def setDiscountPriceTemplate(self):
        pass

    def to_dict_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'sku': self.sku,
            'price': self.price,
            'description': self.description
        }

class TemplateImage(models.Model):
    template = models.ForeignKey(Template, related_name='images', on_delete=models.CASCADE)
    thumbnails = models.ImageField(null=False, blank=False)
    originals = models.ImageField(null=False, blank=False)

    def __str__(self):
        return '%s' % (self.template.title)


class Discount(models.Model):
    name = models.CharField(max_length=200)
    template = models.ForeignKey(
        Template, related_name='discount',
        on_delete=models.CASCADE, blank=True, null=True)
    discount_value = models.DecimalField('Desconto', decimal_places=2, max_digits=8)
    discount_value_type = models.CharField(
        max_length=10, choices=DiscountValueType.DISCOUNT_CHOICES,
        default=DiscountValueType.FIXED)

    def __str__(self):
        return '%s %s' % (self.discount_value, self.discount_value_type)

    def to_dict_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'template': self.template,
            'discount_value': self.discount_value,
            'discount_value_type': self.discount_value_type
        }