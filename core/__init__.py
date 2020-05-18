class DiscountValueType:
    FIXED = 'fixed'
    PERCENTAGE = 'percentage'

    DISCOUNT_CHOICES = (
        ('F', FIXED),
        ('P', PERCENTAGE)
    )