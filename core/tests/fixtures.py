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
        title='TemplateOne', sku='32KU052020', price='32.50', description='teste template'
    )
    template_2 = Template.objects.create(
        title='TemplateTwo', sku='33KU052020', price='45.99', description='teste template'
    )
    template_3 = Template.objects.create(
        title='TemplateThree', sku='34KU052020', price='32.51', description='teste template'
    )
    discount1 = Discount.objects.create(name='Dad', template=template_1, discount_value='10.50')
    discount1.save()
    discount2 = Discount.objects.create\
        (name='Dad', template=template_2, discount_value='10', discount_value_type='percentage')
    discount2.save()
    imagens1 = TemplateImage.objects.create(thumbnails='image1.jpg', originals='image2.jpg', template=template_1)
    imagens2 = TemplateImage.objects.create(thumbnails='image3.jpg', originals='image4.jpg', template=template_1)
    imagens1.save()
    imagens2.save()

    return [template_1, template_2, template_3]


def template():
    template_one = Template.objects.create(
        title='TemplateOne', sku='32KU052020', price='32.50', description='teste template'
    )
    return template_one


def invoice():
    sheik = user_sheik()
    template_one = Template.objects.create(
        title='TemplateOne', sku='32KU052020', price='32.50', description='teste template'
    )
    template_one.save()
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
