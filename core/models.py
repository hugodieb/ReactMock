from django.db import models
from django.contrib.auth.models import User


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