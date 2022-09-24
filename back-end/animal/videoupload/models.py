from django.contrib.auth.models import models
from django.db import models
from django.contrib.auth.models import User
from .validator import *

class Document(models.Model):
    mouse_name = models.CharField(max_length = 50)
    experimental_model = models.CharField(max_length=50)
    Heredity = models.CharField(max_length=50)
    Genotype = models.CharField(max_length=50)
    uploadedFile = models.FileField(upload_to="Uploaded Files/", validators=[validate_file_extension])
    dateTimeOfUpload = models.DateTimeField(auto_now = True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING,  null=True)
