from rest_framework import routers
from .api import todoMessageViewSet

router = routers.DefaultRouter()
router.register('api/todos', todoMessageViewSet, 'todos')

urlpatterns = router.urls
