from django.db import connection


def get_or_none(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None

def get_template_id_or_title(model, id, title):
    return get_or_none(model, pk=id) if id else get_or_none(model, title=title)


def dictfetchall(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        result = [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
    return result
