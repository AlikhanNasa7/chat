# Generated by Django 4.2.5 on 2024-08-06 16:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import server.models
import server.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('description', models.TextField()),
                ('icon', models.FileField(blank=True, null=True, upload_to=server.models.category_icon_upload_path, validators=[server.validators.validate_image_file_extension])),
            ],
        ),
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('banner', models.ImageField(blank=True, null=True, upload_to=server.models.server_banner_upload_path, validators=[server.validators.validate_image_file_extension])),
                ('icon', models.ImageField(blank=True, null=True, upload_to=server.models.server_icon_upload_path, validators=[server.validators.validate_icon_image_size, server.validators.validate_image_file_extension])),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='servers', to='server.category')),
                ('member', models.ManyToManyField(related_name='members', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_servers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('topic', models.CharField(max_length=100)),
                ('banner', models.ImageField(blank=True, null=True, upload_to=server.models.channel_banner_upload_path, validators=[server.validators.validate_image_file_extension])),
                ('icon', models.ImageField(blank=True, null=True, upload_to=server.models.channel_icon_upload_path, validators=[server.validators.validate_icon_image_size, server.validators.validate_image_file_extension])),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_channels', to=settings.AUTH_USER_MODEL)),
                ('server', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='channels', to='server.server')),
            ],
        ),
    ]
