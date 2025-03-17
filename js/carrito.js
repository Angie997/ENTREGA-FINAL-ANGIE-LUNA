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
      this.productos = [];
    }
  
    agregarProducto(producto) {
      this.productos.push(producto);
      console.log(`${producto.nombre} agregado al carrito.`);
    }
  
    eliminarProducto(nombreProducto) {
      this.productos = this.productos.filter(producto => producto.nombre !== nombreProducto);
      console.log(`${nombreProducto} eliminado del carrito.`);
    }
  
    calcularTotal() {
      return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }
  
    mostrarCarrito() {
      console.log("Carrito de Compras:");
      this.productos.forEach(producto => console.log(`- ${producto.nombre}: S/ ${producto.precio}`));
      console.log(`Total: S/ ${this.calcularTotal()}`);
    }
  }
  
  // Lista de productos disponibles
  const listaProductos = [
    new Producto("Cartera Negra", 150, "todos"),
    new Producto("Cartera Marron", 200, "todos"),
    new Producto("Cartera Tachas", 250, "todos"),
    new Producto("Cartera Flecos", 220, "todos"),
    new Producto("Cartera Rosa", 130, "todos"),
    new Producto("Cartera Plateada", 180, "todos"),
    new Producto("Sombrero", 70, "accesorios"),
    new Producto("Cinto", 50, "accesorios"),
    new Producto("Mochila", 150, "accesorios")
  ];
  
  const carrito = new Carrito();
  
  // Función para renderizar productos en el contenedor #contenedor-productos
  function renderizarProductos(categoria = "todos") {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; // Limpiar el contenedor
  
    // Filtrar productos por categoría (si no es "todos", se filtran)
    const productosFiltrados = categoria === "todos" ? listaProductos : listaProductos.filter(prod => prod.categoria === categoria);
  
    productosFiltrados.forEach((producto, index) => {
      // Usamos la posición del producto en listaProductos para asignarla al botón
      const indiceGlobal = listaProductos.indexOf(producto);
      const divProducto = document.createElement("div");
      divProducto.classList.add("producto");
      divProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: S/ ${producto.precio}</p>
        <button class="btn-agregar" data-index="${indiceGlobal}">Agregar al carrito</button>
      `;
      contenedor.appendChild(divProducto);
    });
  
    // Agregar event listener a cada botón "Agregar al carrito"
    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");
        const productoSeleccionado = listaProductos[idx];
        carrito.agregarProducto(productoSeleccionado);
        actualizarNumerito();
        Toastify({
            text: `${productoSeleccionado.nombre} agregado al carrito`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
        }).showToast();
      });
    });
  }
  
  // Función para actualizar el número en el contador del carrito (elemento con id "numerito")
  function actualizarNumerito() {
    const numerito = document.getElementById("numerito");
    numerito.innerText = carrito.productos.length;
  }
  
  // Configuración de botones de filtrado de categorías
  document.addEventListener("DOMContentLoaded", () => {
    // Cargar todos los productos por defecto
    renderizarProductos("todos");
  
    // Configurar botones del menú de categorías
    const botonesCategoria = document.querySelectorAll(".boton-categoria");
    botonesCategoria.forEach(boton => {
      boton.addEventListener("click", (e) => {
        // Remover la clase active de todos los botones y agregarla solo al seleccionado
        botonesCategoria.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
  
        // Se asume que el id del botón es la categoría (ej. "todos", "abrigos", "camisetas", "pantalones")
        const categoria = e.target.id;
        renderizarProductos(categoria);
      });
    });
  });