from rest_framework import routers
from .api import todoMessageViewSet, todoTabViewSet

router = routers.DefaultRouter()
router.register('api/todos', todoMessageViewSet, 'todos')
router.register('api/tabs', todoTabViewSet, 'todotab')

urlpatterns = router.urls
