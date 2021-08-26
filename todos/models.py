from django.db import models
from django.contrib.auth.models import User

class todoTab(models.Model):
    tab = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

class todoMessage(models.Model):
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="owner", on_delete=models.CASCADE, null=True)
    tab = models.ForeignKey(todoTab, null=True, blank=True, on_delete=models.CASCADE)
    complete = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
