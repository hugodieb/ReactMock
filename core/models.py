from django.db import models
from django.contrib.auth.models import User
from . import DiscountValueType, StatusPayment, StatusCart
from commons.utils import random_sku_template


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

    def save(self, *args, **kwargs):
        self.sku = self.create_sku_template()
        super(Template, self).save(*args, **kwargs)

    def __str__(self):
        return '%s' % (self.title)

    def create_sku_template(self):
        return random_sku_template(6)

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
    thumbnails = models.CharField(max_length=1024)
    originals = models.CharField(max_length=1024)

    def __str__(self):
        return '%s' % (self.template.title)


class Discount(models.Model):
    name = models.CharField(max_length=200)
    template = models.ManyToManyField(
        Template, related_name='discount',
        blank=True, null=True)
    discount_value = models.DecimalField('Desconto', decimal_places=2, max_digits=8)
    discount_value_type = models.CharField(
        max_length=10, choices=DiscountValueType.DISCOUNT_CHOICES,
        default=DiscountValueType.FIXED)

    def __str__(self):
        return '%s %s' % (self.discount_value, self.discount_value_type)

    def calculate_discount_to_template(self):
        templates = self.template.all()
        if templates:
            for template in templates:
                price = template.price
                discount = self.discount_value
                discount_type = self.discount_value_type
                price_pay = 0.00
                if discount > 0:
                    if discount_type == 'percentage':
                        price_pay = (price - (price*discount)/100)
                    elif discount_type == 'fixed':
                        price_pay = price - discount
                    return round(price_pay, 2)
                else:
                    return round(price, 2)
        return round(self.template.price, 2)

    def to_dict_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'template': self.template,
            'discount_value': self.discount_value,
            'discount_value_type': self.discount_value_type
        }


class InvoiceOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    template = models.ForeignKey(Template, related_name='invoice', on_delete=models.CASCADE)
    subtotal = models.DecimalField('Subtotal', decimal_places=2, max_digits=8)
    total = models.DecimalField('Total', decimal_places=2, max_digits=8)
    order_number = models.PositiveIntegerField('Ordem Serviço', default=0)
    status = models.CharField('Status', max_length=32, default='waiting', choices=StatusPayment.STATUS)
    payment_method = models.CharField('Método de pagamento', max_length=200)
    created_at = models.DateTimeField('Criado em', auto_now_add=True)
    update_at = models.DateTimeField('Atualizado em', auto_now=True)

    def __str__(self):
        return '%s %s' % (self.order_number, self.status)

    def to_dict_json(self):
        items = []
        item = {
            'name': self.template.title,
            'description': self.template.description,
            'quantity': "1",
            'price': self.total,
            'tax': "0.00",
            'sku': self.template.sku,
            'currency': "BRL"
        }
        items.append(item)
        d = {
            'id': self.id,
            'invoice_number': self.order_number,
            'subtotal': self.subtotal,
            'total': self.total,
            'items': items
        }
        return d

class Cart(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    template = models.ForeignKey(Template, related_name='template', on_delete=models.CASCADE)
    status = status = models.CharField('Status', max_length=32, default='open', choices=StatusCart.STATUS)
    token = models.CharField(max_length=32, null=True, blank=True)
    created_at = models.DateTimeField('Criado em', auto_now_add=True)
    update_at = models.DateTimeField('Atualizado em', auto_now=True)

    def __str__(self):
        return '%s' % (self.status)


