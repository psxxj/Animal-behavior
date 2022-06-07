from .views import *
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "videoupload"

urlpatterns = [
    path("", uploadFile, name="uploadFile"),
    path('download/<int:id>/', download, name="download"),
    path('predict/<int:id>/', predict, name="predict"),
    path('visualization/<int:id>/', visualization, name="visualization"),
]


urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root = settings.MEDIA_ROOT
    )
