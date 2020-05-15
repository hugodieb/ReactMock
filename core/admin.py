from django.contrib import admin

from core.models import Profile

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'birth_date', 'cell_phone', 'cpf', 'photo_url')
# Register your models here.

admin.site.register(Profile, ProfileAdmin)