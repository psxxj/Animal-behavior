from django.urls import path, include
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('home/signup/', signup, name='signup'),
    path('home/login/', login, name='login'),
    path('home/logout/', logout, name='logout'),
    path('home/', home, name='home'),
    path('home/main_app', UserListCreate.as_view(), name='UserList'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
