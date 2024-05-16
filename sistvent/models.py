from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
#from django.utils import timezone

# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    inventario = models.IntegerField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    correo = models.EmailField()
    direccion = models.TextField()

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Venta(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha_venta = models.DateField(auto_now_add=True)
    total_venta = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pago = models.CharField(max_length=50)

    def calcular_total_venta(self):
        total = self.detalleventa_set.aggregate(total=models.Sum(models.F('subtotal')))['total']
        self.total_venta = total if total is not None else 0

    def save(self, *args, **kwargs):
        self.calcular_total_venta()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Venta #{self.id}"

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def calcular_subtotal(self):
        self.subtotal = self.cantidad_productos * self.precio_producto

    def save(self, *args, **kwargs):
        self.calcular_subtotal()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Detalle de Venta #{self.id}"

@receiver(post_save, sender=DetalleVenta)
@receiver(post_delete, sender=DetalleVenta)
def actualizar_subtotal(sender, instance, **kwargs):
    instance.calcular_subtotal()
    instance.save()

@receiver(post_save, sender=DetalleVenta)
@receiver(post_delete, sender=DetalleVenta)
def actualizar_total_venta(sender, instance, **kwargs):
    instance.venta.calcular_total_venta()
    instance.venta.save()