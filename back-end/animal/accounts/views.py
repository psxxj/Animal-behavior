
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
from .serializer import *
from rest_framework import generics

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Create your views here.
# 회원가입
def signup(request):
    if request.method == 'POST':
        if len(request.POST['password1']) > 7:
            if request.POST['password1'] == request.POST['password2']:
                user = User.objects.create_user(
                                            username=request.POST['email'],
                                            password=request.POST['password1'],)
                auth.login(request, user)
                messages.add_message(
                    request,
                    messages.SUCCESS,
                    "Signup Success"
                )
                return redirect('/')
            else:
                messages.add_message(
                    request,
                    messages.ERROR,
                    "passwords are not equal"
                )
            return render(request, 'signup.html')
        else:
            messages.add_message(
                request,
                messages.ERROR,
                "Password be at least 8 characters"
            )
        return render(request, 'signup.html')
    else:
        messages.error(request, "error")
    return render(request, 'signup.html')

# 로그인
def login(request):
    if request.method == 'POST':
        username = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            messages.add_message(
                request,
                messages.SUCCESS,
                'Login Success'
            )
            return redirect('/')
        else:
            messages.add_message(
                request,
                messages.ERROR,
                'Login Failed'
            )
            return render(request, 'login.html',)
    else:
        messages.error(request, "error")
        return render(request, 'login.html')


# 로그아웃
def logout(request):
    auth.logout(request)
    return redirect('/')

# home
def home(request):
    return render(request, 'home.html')
