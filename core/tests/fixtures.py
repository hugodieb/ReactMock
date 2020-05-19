from core.models import User, Profile, Template

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
    # template = Template(title='TemplateOne', sku='32KU052020', price='32.50', description='teste template')
    template_1 = Template.objects.create(
        title='TemplateOne', sku='32KU052020', price='32.50', description='teste template'
    )
    template_2 = Template.objects.create(
        title='TemplateTwo', sku='33KU052020', price='45.55', description='teste template'
    )
    template_3 = Template.objects.create(
        title='TemplateThree', sku='34KU052020', price='32.51', description='teste template'
    )

    return [template_1, template_2, template_3]