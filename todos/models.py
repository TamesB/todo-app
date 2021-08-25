from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class todoMessage(models.Model):
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="leads", on_delete=models.CASCADE, null=True)
    complete = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)