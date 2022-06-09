from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import Register

urlpatterns = [
    path('', Register.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)