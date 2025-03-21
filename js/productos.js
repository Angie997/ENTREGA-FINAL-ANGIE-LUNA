import { Carrito } from "./carrito.js";
// Lista de productos
const productos = [
  {
    nombre: "Cartera Negra",
    descripcion: "Arma tu look. Disponible en varios colores.",
    imagen: "../Imagnes para subir tp/Cartera negra.jpg",
    enlace: "#",
    precio: 145000,
  },
  {
    nombre: "Cartera Animal Print",
    descripcion: "Animate y arma un buen look.",
    imagen: "../Imagnes para subir tp/Cartera animal print.jpg",
    enlace: "#",
    precio: 158000,
  },
  {
    nombre: "Cartera Blanca",
    descripcion: "Y de varios colores para combinar con tu outfit preferido.",
    imagen: "../Imagnes para subir tp/Cartera blanca.jpg",
    enlace: "#",
    precio: 132000,
  },
  {
    nombre: "Cartera Flecos",
    descripcion: "Tenemos diferentes colores y diseños.",
    imagen: "../Imagnes para subir tp/cartera flecos.jpg",
    enlace: "#",
    precio: 176000,
  },
  {
    nombre: "Cartera Marrón",
    descripcion: "Disponible en colores varios.",
    imagen: "../Imagnes para subir tp/Cartera marron.jpg",
    enlace: "#",
    precio: 162000,
  },
  {
    nombre: "Cintos",
    descripcion: "Cintos para mujer. Disponibles en varios colores.",
    imagen: "../Imagnes para subir tp/cintos.jpg",
    enlace: "#",
    precio: 108000,
  },
  {
    nombre: "Cartera Plateada",
    descripcion: "Arma tu look de temporada. Disponibles en varios colores.",
    imagen: "../Imagnes para subir tp/Cartera plateada.jpg",
    enlace: "#",
    precio: 189000,
  },
  {
    nombre: "Cartera Roja",
    descripcion: "Cartera Roja. Disponible en varios tamaños y colores.",
    imagen: "../Imagnes para subir tp/Cartera roja.jpg",
    enlace: "#",
    precio: 170000,
  },
  {
    nombre: "Cartera Pink",
    descripcion: "En varios colores. Cartera importada.",
    imagen: "../Imagnes para subir tp/carterarosa.jpg",
    enlace: "#",
    precio: 155000,
  },
  {
    nombre: "Cartera Tachas",
    descripcion:
      "Crea tu outfit canchero perfecto para la temporada. Disponibles en diferentes colores.",
    imagen: "../Imagnes para subir tp/Carteras tachas.jpg",
    enlace: "#",
    precio: 165000,
  },
  {
    nombre: "Mochilas Unisex",
    descripcion: "También para ellos. Mochilas unisex.",
    imagen: "../Imagnes para subir tp/Mochila.jpg",
    enlace: "#",
    precio: 199000,
  },
  {
    nombre: "Sombreros",
    descripcion:
      "Arma tu look con estos hermosos sombreros. Disponible en dos colores.",
    imagen: "../Imagnes para subir tp/Sombreros.jpg",
    enlace: "#",
    precio: 112000,
  },
];

// Instancia de la clase Carrito para manejar los productos
const carrito = new Carrito();

export function generarProductos(contenedorId) {
  // Obtiene el contenedor del DOM y verifica si existe
  const contenedor = document.getElementById(contenedorId);

  if (!contenedor) {
    console.error(`No se encontró un contenedor con el ID: ${contenedorId}`);
    return;
  }

  // Recorre la lista de productos y los muestra en el contenedor
  productos.forEach((producto) => {
    // Crea un div para cada producto
    const productDiv = document.createElement("div");
    productDiv.classList.add("gallery-products");

    // Crea el contenido del producto
    const productoHTML = document.createElement("div");
    productoHTML.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h4>${producto.nombre}</h4>
      <p>${producto.descripcion}</p>
      <p>$${producto.precio}</p>
    `;

    // Crea el contenedor para el botón o controles de cantidad
    const addButtonContainer = document.createElement("div");

    // Función para actualizar el botón de agregar o los controles de cantidad
    const actualizarBotonCarrito = () => {
      // Busca el índice del producto en el carrito
      const index = carrito.productos.findIndex(
        (item) => item.nombre === producto.nombre
      );
      // Limpia el contenedor antes de actualizarlo
      addButtonContainer.innerHTML = "";

      if (index === -1) {
        // Si no está en el carrito, muestra el botón "Agregar al carrito"
        const addButton = document.createElement("a");
        addButton.href = "#";
        addButton.textContent = "Agregar al carrito →";
        addButton.addEventListener("click", (e) => {
          e.preventDefault();
          carrito.agregarProducto({ ...producto, cantidad: 1 });
          actualizarBotonCarrito();
        });
        addButtonContainer.appendChild(addButton);
      } else {
        // Si está en el carrito, muestra los botones de cantidad
        const cantidad = carrito.productos[index].cantidad;

        const btnRestar = document.createElement("button");
        btnRestar.textContent = "-";
        btnRestar.classList.add("btn-restar");
        btnRestar.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("Restar producto", carrito.productos[index]);
          if (carrito.productos[index]) {
            if(carrito.productos[index].cantidad === 1) {
              carrito.productos.splice(index, 1);
            }
            else{
              carrito.actualizarCantidad(index, -1);
            }
          }
          
          actualizarBotonCarrito();
        });

        const cantidadSpan = document.createElement("span");
        cantidadSpan.textContent = cantidad;
        cantidadSpan.classList.add("cantidad-producto");

        const btnSumar = document.createElement("button");
        btnSumar.textContent = "+";
        btnSumar.classList.add("btn-sumar");
        btnSumar.addEventListener("click", () => {
          carrito.agregarProducto({ ...producto, cantidad: 1 });
          actualizarBotonCarrito();
        });

        // Agregar los elementos al contenedor
        addButtonContainer.appendChild(btnRestar);
        addButtonContainer.appendChild(cantidadSpan);
        addButtonContainer.appendChild(btnSumar);
      }
    };

    // Inicializa el estado del botón al cargar los productos
    actualizarBotonCarrito();

    // Agrega los elementos al contenedor
    productDiv.appendChild(productoHTML);
    productDiv.appendChild(addButtonContainer);
    contenedor.appendChild(productDiv);
  });
}
