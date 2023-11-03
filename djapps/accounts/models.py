from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import EmailValidator, MinValueValidator
from django.contrib.auth.password_validation import validate_password





class UserManager(models.Manager):
    def create_user(self, firstname, lastname, age, town, gender):
        user = self.model(
            firstname=firstname,
            lastname=lastname,
            age = age,
            town=town,
            gender=gender
        )
        
        return user



class MyUsers(models.Model):
    CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other")
    ]
    firstname = models.CharField(
        max_length=50,
        null= False,
    )

    lastname = models.CharField(
        max_length=50,
        null= False,
        unique=True
    )

    age = models.IntegerField(
        validators=[MinValueValidator(0)],
        null=False
    )

    town = models.CharField(
        max_length=50,
        null=False
    )

    gender = models.CharField(
        choices=CHOICES,
        max_length=10,
        null=False
    )
    objects = UserManager()