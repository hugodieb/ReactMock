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
    template = Template(
        title='TemplateOne',
        sku='32ku052020',
        price='30.00',
        description='Template teste'
    )
    template.save()
    return template