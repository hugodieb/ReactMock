# Generated by Django 2.2.12 on 2020-06-05 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20200604_1920'),
    ]

    operations = [
        migrations.AlterField(
            model_name='templateimage',
            name='originals',
            field=models.ImageField(upload_to='placeholders/'),
        ),
        migrations.AlterField(
            model_name='templateimage',
            name='thumbnails',
            field=models.ImageField(upload_to='placeholders/'),
        ),
    ]
