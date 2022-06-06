from rest_framework import serializers
from .models import *


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'mouse_name', 'experimental_model', 'Heredity', 'Genotype', 'uploadedFile', 'dateTimeOfUpload', 'user_id')

         