from core.models import User, Profile, Template, Discount, TemplateImage, InvoiceOrder

def user_sheik():
    sheik = User.objects.create_user(
        username='sheikdog',
        first_name='Sheik',
        last_name='Dog',
        email='sheik@dog.com',
        password='sheik',
    )
    profile = Profile.objects.create(user=sheik, cell_phone='1223456789', cpf='123456789098')
    profile.save()
    return sheik

def templates():
    template_1 = Template.objects.create(
        title='TemplateOne', price='32.50', description='teste template'
    )
    template_2 = Template.objects.create(
        title='TemplateTwo', price='45.99', description='teste template'
    )
    template_3 = Template.objects.create(
        title='TemplateThree', price='32.51', description='teste template'
    )

    d1 = Discount(name='Dad', discount_value='10.50')
    d1.save()
    d1.template.add(template_1)
    d2 = Discount(name='whowho', discount_value='10', discount_value_type='percentage')
    d2.save()
    d2.template.add(template_2)
    TemplateImage.objects.create(thumbnails='/images/image1.jpg', originals='/images/image2.jpg', template=template_1)
    TemplateImage.objects.create(thumbnails='/images/image3.jpg', originals='/images/image4.jpg', template=template_2)

    return [template_1, template_2, template_3]


def template():
    template_one = Template.objects.create(
        title='TemplateOne', price='32.50', description='teste template'
    )
    d = Discount.objects.create(name='whowho', discount_value='10', discount_value_type='percentage')
    d.save()
    d.template.add(template_one)
    return template_one


def invoice():
    sheik = user_sheik()
    Template.objects.create(
        title='TemplateOne', sku='32KU052020', price='32.50', description='teste template'
    )
    invoice_order = InvoiceOrder.objects.create(
        user=sheik,
        template=template,
        subtotal='100',
        total='100',
        order_number='12345678',
        status='waiting',
        payment_method='paypal'
    )
    invoice_order.save()
    return invoice_order
