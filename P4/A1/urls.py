from django.urls import path
from . import views
app_name='A1'
urlpatterns = [
    path('', views.index, name="index"),
]