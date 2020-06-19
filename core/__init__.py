class DiscountValueType:
    FIXED = 'fixed'
    PERCENTAGE = 'percentage'

    DISCOUNT_CHOICES = (
        ('F', FIXED),
        ('P', PERCENTAGE)
    )

class StatusPayment:
    STATUS = [(c, c) for c in ['waiting', 'paid', 'disapproved']]


class StatusCart:
    STATUS = [(c, c) for c in ['open', 'closed']]
