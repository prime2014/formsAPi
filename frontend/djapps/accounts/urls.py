from django.urls import path, include
from rest_framework.routers import DefaultRouter
from djapps.accounts.views import UserViewset
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static

router = DefaultRouter()
router.register("accounts", viewset=UserViewset, basename="accounts")

urlpatterns = [
    path("v1/", include(router.urls)),
]+staticfiles_urlpatterns()