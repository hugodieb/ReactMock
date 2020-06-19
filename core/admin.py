from django.contrib import admin

from core.models import Profile, Template,\
    TemplateImage, Discount,\
    InvoiceOrder, Cart


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'birth_date', 'cell_phone', 'cpf', 'photo_url')

class TemplateAdmin(admin.ModelAdmin):
    list_display = ('title', 'sku', 'price', 'description')


class TemplateImagesAdmin(admin.ModelAdmin):
    list_display = ('template', 'thumbnails', 'originals')


class DiscountAdmin(admin.ModelAdmin):
    list_display = ('name', 'discount_value', 'discount_value_type')


class InvoiceOrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'template', 'subtotal', 'total', 'order_number', 'status', 'payment_method', 'created_at', 'update_at')


class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'template', 'status', 'created_at', 'update_at')

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Template, TemplateAdmin)
admin.site.register(TemplateImage, TemplateImagesAdmin)
admin.site.register(Discount, DiscountAdmin)
admin.site.register(InvoiceOrder, InvoiceOrderAdmin)
admin.site.register(Cart, CartAdmin)
