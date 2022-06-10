from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('', MainRegister.as_view()),
    path('/download/', download, name="download")
]


urlpatterns = format_suffix_patterns(urlpatterns)
