from django.contrib import admin
from .models import Category, Channel, Account, Server


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Account)
