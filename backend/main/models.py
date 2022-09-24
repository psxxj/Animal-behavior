from django.db import models

class Document(models.Model):
    mouse_name = models.CharField(max_length=50)
    experimental_model = models.CharField(max_length=50)
    heredity = models.CharField(max_length=50, null=True)
    genotype = models.CharField(max_length=50, null=True)
    #uploadedFile = models.FileField(upload_to="Uploaded Files/")
    #user = models.ForeignKey(User, on_delete=models.DO_NOTHING,  null=True)