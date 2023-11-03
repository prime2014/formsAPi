from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from djapps.accounts.models import MyUsers
from djapps.accounts.serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status

class UserViewset(ModelViewSet):
    queryset = MyUsers.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, *args, **kwargs):
        self.perform_destroy(self.get_object())
        return Response({"success": "deleted"}, status=status.HTTP_204_NO_CONTENT)

        
