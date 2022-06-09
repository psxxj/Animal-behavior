from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

from .serializers import MemberSerializer
from .models import Member

class Register(APIView):
    def get(self, request):
        members = Member.objects.all()

        serializer = MemberSerializer(members, many = True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MemberSerializer(
            data=request.data)

        if serializer.is_valid():
            if len(serializer.validated_data['password']) > 7:
                serializer.save()
                return Response(serializer.data, status = status.HTTP_201_CREATED)

        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)