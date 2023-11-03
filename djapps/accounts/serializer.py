from rest_framework import serializers
from djapps.accounts.models import MyUsers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUsers
        fields = "__all__"

    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        instance.firstname = validated_data.get("firstname", instance.firstname)
        instance.lastname = validated_data.get("lastname", instance.lastname)
        instance.age = validated_data.get("age", instance.age)
        instance.town = validated_data.get("town", instance.town)
        instance.gender = validated_data.get("gender", instance.gender)
        instance.save()
        return instance


