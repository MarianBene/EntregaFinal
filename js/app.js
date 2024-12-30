// configuracion de productos con stock y dctos
const productos = {
    entradas: {
        nombre: 'Entradas',
        precio: 3500,
        stock: 100,
        descuento: 0.1 
    },
    alimentog: {
        nombre: 'Alimentog',
        precio: 500,
        stock: 150,
        descuento: 0.05
    },
    alimentoc: {
        nombre: 'Alimentoc',
        precio: 1000,
        stock: 150,
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
        renderizarCarrito()  
    
    }
    
    function renderizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito')
        const subtotalCarrito = document.getElementById('subtotal-carrito')
        const descuentoCarrito = document.getElementById('descuento-carrito')
        const ivaCarrito = document.getElementById('iva-carrito')
        const totalCarrito = document.getElementById('total-carrito')
        const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    
        listaCarrito.innerHTML = ''
    
        let subtotal = 0
        let descuentoTotal = 0
    
    // renderizar cada producto
        carrito.forEach((producto, index) => {
            const productoInfo = productos[producto.productoKey]
            const li = document.createElement('li')
    //calcular dscto individual
            const descuentoProducto = productoInfo.descuento * producto.precio
            const precioConDescuento = producto.precio - descuentoProducto
            li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
                ${productoInfo.descuento > 0 ?
                `<span class= "descuento">(Desc. ${(productoInfo.descuento * 100).toFixed(0)}%:
                -$${descuentoProducto.toFixed(2)})</span>`
                : ''}`
    //eliminar el producto
            const botonEliminar = document.createElement('button')
            botonEliminar.textContent = 'Eliminar'
            botonEliminar.onclick = () => eliminarCarrito(index)
    
            li.appendChild(botonEliminar)
            listaCarrito.appendChild(li)
    //cuentas
            subtotal += producto.precio
            descuentoTotal += descuentoProducto
            
        })
    
        // calcular IVA
        const ivatotal = (subtotal - descuentoTotal) * IVA
        const total = subtotal - descuentoTotal + ivatotal
    
        //Actualizar totales
        subtotalCarrito.textContent = subtotal.toFixed(2)
        descuentoCarrito.textContent = descuentoTotal.toFixed(2)
        ivaCarrito.textContent = ivatotal.toFixed(2)
        totalCarrito.textContent = total.toFixed(2)
    }
    
    function eliminarCarrito(index) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []
        //recuperar el producto y devolverlo al stock
        const producto = productos[carrito[index].productoKey]
        producto.stock++
        document.getElementById(`stock-${carrito[index].productoKey}`).textContent = producto.stock
        carrito.splice(index, 1)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        renderizarCarrito()
    }
    
    function vaciarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || []
        carrito.forEach(item => {
            const producto = productos[item.productoKey]
            producto.stock++
            document.getElementById(`stock-${item.productoKey}`).textContent = producto.stock
    
            localStorage.removeItem('carrito')
            renderizarCarrito()
        })
    }
    
    function mostrarCheckout() {
        // Obtener los elementos necesarios
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const subtotalCarrito = parseFloat(document.getElementById('subtotal-carrito').textContent);
        const descuentoCarrito = parseFloat(document.getElementById('descuento-carrito').textContent);
        const ivaCarrito = parseFloat(document.getElementById('iva-carrito').textContent);
        const totalCarrito = parseFloat(document.getElementById('total-carrito').textContent);
    
        // Verificar si el carrito está vacío
        if (carrito.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de proceder al Checkout.');
            return;
        }
    
        // Actualizar los valores del modal
        document.getElementById('modal-subtotal').textContent = subtotalCarrito.toFixed(2);
        document.getElementById('modal-descuento').textContent = descuentoCarrito.toFixed(2);
        document.getElementById('modal-iva').textContent = ivaCarrito.toFixed(2);
        document.getElementById('modal-total').textContent = totalCarrito.toFixed(2);
    
        // Mostrar el modal
        const modal = document.getElementById('checkout-modal');
        modal.style.display = 'block';
    }
    
    function cerrarCheckout() {
        // Ocultar el modal
        const modal = document.getElementById('checkout-modal');
        modal.style.display = 'none';
    }
    
    function realizarCompra() {
        alert('Compra realizada con éxito. ¡Gracias por tu compra!');
        vaciarCarrito(); // Vaciar el carrito tras la compra
        cerrarCheckout(); // Cerrar el modal
    }
    
    function cargarCarrito() {
        renderizarCarrito() 
    }