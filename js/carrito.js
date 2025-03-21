// Clase Carrito
export class Carrito {
    constructor() {
      this.productos = JSON.parse(localStorage.getItem("cart")) || [];
    }
  
    agregarProducto(producto) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      // Si no, agregarlo al carrito
      // Recorre el array de productos y si encuentra un producto con el mismo nombre, aumenta la cantidad
      this.productos.find((item) => item.nombre === producto.nombre)
        ? (this.productos = this.productos.map((item) =>
            item.nombre === producto.nombre
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ))
        : this.productos.push({ ...producto, cantidad: 1 });
      // Guarda el carrito en localStorage
      localStorage.setItem("cart", JSON.stringify(this.productos));
      console.log(`${producto.nombre} agregado al carrito.`);
    }
  
    eliminarProducto(nombreProducto) {
      this.productos = this.productos.filter(
        (producto) => producto.nombre !== nombreProducto
      );
      localStorage.setItem("cart", JSON.stringify(this.productos));
      console.log(`${nombreProducto} eliminado del carrito.`);
    }
  
    calcularTotal() {
      return this.productos.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );
    }
    actualizarCantidad(index, cambio) {
      this.productos[index].cantidad += cambio;
  
      // Evitar cantidades negativas y borrarlo de la lista
      if (this.productos[index].cantidad < 1) {
        console.log("soy menor a 1")
        this.productos.splice(index, 1);
        this.mostrarCarrito();
      }
  
      // Actualizar el localStorage con la nueva cantidad
      localStorage.setItem("cart", JSON.stringify(this.productos));
  
      // Actualizar solo el elemento en la UI sin re-renderizar todo
      const cantidadSpan = document.querySelectorAll(".cantidad-producto")[index];
  
      cantidadSpan.textContent = this.productos[index].cantidad;
  
      // Recalcular el total general
      this.actualizarTotal();
    }
  
    // Nueva función para actualizar el precio total
    actualizarTotal() {
      let total = this.productos.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      );
      document.querySelector(
        ".total-lista-productos"
      ).textContent = `Total: $/ ${total.toFixed(2)}`;
    }
  
    mostrarCarrito() {
      const cartList = document.getElementById("productos-container-carrito");
      const totalContainer = document.getElementById("total-container");
      cartList.innerHTML = "";
      totalContainer.innerHTML = ""; // Limpiar el total antes de actualizarlo
  
      let total = 0;
  
      if (this.productos.length === 0) {
        cartList.innerHTML =
          "<p class='mensaje-vacio'>No hay productos en el carrito</p>";
        return;
      }
  
      this.productos.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("producto-item");
  
        // Contenedor para la información del producto
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("producto-info");
        infoDiv.textContent = `${item.nombre} - $/ ${item.precio}`;
  
        // Botón de restar
        const btnRestar = document.createElement("button");
        btnRestar.textContent = "-";
        btnRestar.classList.add("btn-restar");
        btnRestar.addEventListener("click", () =>
          this.actualizarCantidad(index, -1)
        );
  
        // Cantidad de producto
        const cantidadSpan = document.createElement("span");
        cantidadSpan.classList.add("cantidad-producto");
        cantidadSpan.textContent = item.cantidad;
  
        // Botón de sumar
        const btnSumar = document.createElement("button");
        btnSumar.textContent = "+";
        btnSumar.classList.add("btn-sumar");
        btnSumar.addEventListener("click", () =>
          this.actualizarCantidad(index, 1)
        );
  
        // Imagen del producto
        const img = document.createElement("img");
        img.classList.add("producto-imagen");
        img.src = item.imagen;
        img.alt = item.nombre;
  
        // Agregar elementos al li
        li.appendChild(infoDiv);
        li.appendChild(btnRestar);
        li.appendChild(cantidadSpan);
        li.appendChild(btnSumar);
        li.appendChild(img);
        cartList.appendChild(li);
  
        total += item.precio * item.cantidad;
      });
  
      // Mostrar total debajo de la lista
      const totalListaProductos = document.createElement("p");
      totalListaProductos.classList.add("total-lista-productos");
      totalListaProductos.textContent = `Total de la compra: $/ ${total.toFixed(
        2
      )}`;
  
      totalContainer.appendChild(totalListaProductos);
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