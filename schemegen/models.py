from django.db import models


class Template(models.Model):
    name = models.CharField(max_length=200)
    header = models.TextField()
    body = models.TextField()
    footer = models.TextField()

    def __str__(self):
        return 'Template: ' + self.name

class TextAlias(models.Model):
    html_id = models.CharField(max_length=50)
    text = models.TextField()

    def __str__(self):
        return f'{self.html_id}: {self.text}'
