# Generated by Django 4.2.5 on 2023-10-26 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_alter_activity_emotion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='uri',
            field=models.CharField(blank=True, max_length=225, null=True),
        ),
    ]
