
//? ENTREGA FINAL - ANGIE LUNA

//! CARGA DATOS PARA REGISTRO
Swal.fire("Te damos la bienvenida a Angeli Accesorios.\nPor favor, regístrate para comenzar a comprar.");

document.addEventListener("DOMContentLoaded", function () {
    let username = "";
    let password = "";

    document.getElementById("registerBtn").addEventListener("click", function () {
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;

        if (username === "" || password === "" || password.length < 8 || password.length > 14) {
            Swal.fire("Error", "Debes ingresar un usuario y una contraseña válida (8-14 caracteres)", "error");
        } else {
            Swal.fire("Registro exitoso", `Te damos la bienvenida a Angeli Accesorios, ${username}!`, "success");
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        }
    });
});

//! LISTA DE PRODUCTOS
const products = [
    { name: "Cartera Negra", price: 150 },
    { name: "Cartera Marron", price: 200 },
    { name: "Cartera Tachas", price: 250 },
    { name: "Cartera Flecos", price: 220 },
    { name: "Cartera Rosa", price: 130 },
    { name: "Sombrero", price: 70 },
];

function showProducts() {
    let productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product, index) => {
        let item = document.createElement("li");
        item.textContent = `${product.name} - S/ ${product.price}`;
        productList.appendChild(item);
    });
}

document.getElementById("viewProducts").addEventListener("click", showProducts);

//! COMPRA DE PRODUCTOS
function buyProducts() {
    let cart = [];
    let selectedProduct = document.getElementById("productSelect").value;
    let quantity = parseInt(document.getElementById("quantity").value);
    
    let product = products.find(p => p.name === selectedProduct);
    if (product && quantity > 0) {
        cart.push({ ...product, quantity });
        Swal.fire("Producto añadido", `Añadiste ${quantity} ${product.name} al carrito.`, "success");
        console.log(`Producto añadido: ${product.name}, Cantidad: ${quantity}`);
    } else {
        Swal.fire("Error", "Selecciona un producto válido y cantidad mayor a 0.", "error");
    }
}

document.getElementById("buyBtn").addEventListener("click", buyProducts);

//! ESCOGE COLOR Y TALLA
document.getElementById("chooseColor").addEventListener("click", function () {
    let colour = document.getElementById("colorSelect").value.toUpperCase();
    let size = document.getElementById("sizeSelect").value.toUpperCase();

    if (["NEGRO", "ROSA", "MARRON", "PLATEADO"].includes(colour)) {
        Swal.fire("Confirmación", `Has elegido el color ${colour} en talla ${size}.`, "info");
    } else {
        Swal.fire("Error", "El color ingresado no es válido.", "error");
    }
});

Swal.fire("Gracias por tu preferencia. ¡Esperamos verte de nuevo pronto!");
