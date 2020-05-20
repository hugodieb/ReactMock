import string
import random


def random_invoice_number(size):
    return ''.join(random.choice(string.digits) for _ in range(size))
