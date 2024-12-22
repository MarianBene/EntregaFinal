const productos = {
entradas: {
    nombre: 'entradas',
    precio: 12000,
    stock: 100,
    descuento: 0.1 
},
alimengog: {
    nombre: 'alimentog',
    precio: 1000,
    stock: 150,
    descuento: 0.05 
},
alimentoc: {
    nombre: 'alimentoc',
    precio: 1500,
    stock: 80,
    descuento: 0
},
}

const IVA = 0.21

document.addEventListener('DOMContentLoaded', cargarCarrito)

function agregarCarrito(nombre, precio, productoKey) {
    const producto = productos[productoKey]

    if(producto.stock <=0) {
        alert('Sin stock')
        return
    }

    // obtener la info del carrito del LS
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []

    // agregar nuevo producto
    carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        productoKey: productoKey
    })

    // reducir stock
    producto.stock--
    document.getElementById(`stock-${productoKey}`).textContent = producto.stock

    // Guardar en LS
    localStorage.setItem('carrito',JSON.stringify(carrito))

    // actualizar la vista
    renderizarCarrito()  // ???

}
