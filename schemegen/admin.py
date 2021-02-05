from django.contrib import admin

from .models import Template, TextAlias

admin.site.register(Template)
admin.site.register(TextAlias)
