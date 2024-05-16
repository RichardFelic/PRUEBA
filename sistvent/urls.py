from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet, ProductoViewSet,
    ClienteViewSet, VentaViewSet, DetalleVentaViewSet
)

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet, 'categorias')
router.register(r'productos', ProductoViewSet, 'productos')
router.register(r'clientes', ClienteViewSet, 'clientes')
router.register(r'ventas', VentaViewSet, 'ventas')
router.register(r'detalles-venta', DetalleVentaViewSet, 'detalles-venta')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="Sistvent API"))
]
