from django.contrib import admin

from core.models import Profile, Template, TemplateImage, Discount

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'birth_date', 'cell_phone', 'cpf', 'photo_url')

class TemplateAdmin(admin.ModelAdmin):
    list_display = ('title', 'sku', 'price', 'description')


class TemplateImagesAdmin(admin.ModelAdmin):
    list_display = ('template', 'thumbnails', 'originals')


class DiscountAdmin(admin.ModelAdmin):
    list_display = ('name', 'template', 'discount_value', 'discount_value_type')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Template, TemplateAdmin)
admin.site.register(TemplateImage, TemplateImagesAdmin)
admin.site.register(Discount, DiscountAdmin)