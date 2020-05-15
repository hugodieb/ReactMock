from core.models import User

def user_sheik():
    sheik = User.objects.create_user(
        username='sheikdog',
        first_name='Sheik',
        last_name='Dog',
        email='sheik@dog.com',
        password='sheik',
    )
    return sheik
