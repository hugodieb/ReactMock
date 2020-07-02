import string
import random


def random_invoice_number(size):
    return ''.join(random.choice(string.digits) for _ in range(size))


def random_sku_template(size):
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(size))


def random_code(size):
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(size))
