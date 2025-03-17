// Clase Producto
class Producto {
    constructor(nombre, precio, categoria = "todos") {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem("cart")) || [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        localStorage.setItem("cart", JSON.stringify(this.productos));
        console.log(`${producto.nombre} agregado al carrito.`);
    }

    eliminarProducto(nombreProducto) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombreProducto);
        localStorage.setItem("cart", JSON.stringify(this.productos));
        console.log(`${nombreProducto} eliminado del carrito.`);
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    }

    mostrarCarrito() {
        const cartList = document.getElementById("cartList");
        const totalPrice = document.getElementById("totalPrice");
        cartList.innerHTML = "";
        let total = 0;
        this.productos.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.nombre} - S/ ${item.precio} x ${item.cantidad}`;
            cartList.appendChild(li);
            total += item.precio * item.cantidad;
        });
        totalPrice.textContent = `Total: S/ ${total.toFixed(2)}`;
    }

    finalizarCompra() {
        Swal.fire("Compra finalizada", "Gracias por tu compra!", "success");
        this.productos = [];
        localStorage.removeItem("cart");
        this.mostrarCarrito();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const carrito = new Carrito();
    carrito.mostrarCarrito();

    document.getElementById("checkoutBtn").addEventListener("click", function () {
        carrito.finalizarCompra();
    });
});