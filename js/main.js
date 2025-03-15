//? ENTREGA FINAL - ANGIE LUNA

//! CARGA DATOS PARA REGISTRO
alert("Te damos la bienvenida a GamaShop.\nPor favor, regístrate para comenzar a comprar.");

let username = "";
let password = "";

while (username === ""){
    username = prompt("Ingresa un nombre de usuario: ");
}

while (password === "" || password.length < 8 || password.length > 14){
    password = prompt("Ingresa una contraseña (entre 8 y 14 caracteres): ");
}

alert("Registro exitoso.\nTe damos la bienvenida a nuestra tienda " + username);

console.log("Guarda esta información en un lugar seguro para tus futuras compras.\nNombre de usuario: " + username + "\n" + "Contraseña: " + password) + "\n";

//! FILTRAR BÚSQUEDA Y STOCK DE PRODUCTO (FILTER/SOME)

const searchProducts = [
    {
        name: "Cartera Negra",
        price: 150
    },
    {
        name: "Cartera Marron",
        price: 200
    },
    {
        name: "Cartera Tachas",
        price: 250
    },
    {
        name: "Cartera Flecos",
        price: 220
    },
    {
        name: "Cartera Rosa",
        price: 130
    },
    {
        name: "Cartera Plateada",
        price: 180
       
    },
    {
        name: "Sombrero",
        price: 70
    },
    {
        name: "Cinto",
        price: 50
    },
    {
        name: "Cartera Rosa",
        price: 230
    },
    {
        name: "Mochila",
        price: 150
    },
];

const names = searchProducts.map(product => product.name);
const list = names.join('\n');

let chosenProd = prompt(`Ingresa el producto de esta lista que te interese buscar: \n${list}`);
console.log(searchProducts.filter((elem) => elem.name.includes(chosenProd)));

let stockProd = prompt(`Ingresa el producto que te interese consultar su stock:\n(Esta lista opcional)\n${list}`);
/* console.log(searchProducts.some((elem) => elem.name == stockProd)); */
let found = searchProducts.some((elem) => elem.name === stockProd);

if (found) {
    alert("Hay stock del producto ingresado.");
} else {
    alert("El producto ingresado no se encuentra disponible.");
    found = false;
}

console.log(found);

//! REALIZANDO COMPRA DE LOS PRODUCTOS
//LISTA DE PRODUCTOS
let products = [
    {
        name: "Cartera Negra",
        price: 150
    },
    { 
        name: "Cartera Marron",
        price: 200
    
    },
    { 
        name: "Cartera Tachas",
        price: 250
    },
    { 
        name: "cartera Flecos",
        price: 220
       
    },
    { 
        name: "Cartera Rosa",
        price: 130
       
    },
    { 
        name: "Sombrero",
        price: 70
    
    },
];

//MOSTRAR LISTA
function showProducts() {
    console.log("--- LISTA DE PRODUCTOS ---");
    for (let i = 0; i < products.length; i++) {
    console.log(`${i + 1}. ${products[i].name} - S/ ${products[i].price}`);
        }
}

//COMPRAR PRODUCTOS
    function buyProducts() {
        let cart = [];
        let option;
    
        while (option !== "0") {
        showProducts();
        console.log("0. Terminar compra");
        option = prompt("Selecciona un número (del 1 al 6) para comprar (0 para terminar)\nMira la lista desde la consola.");
    
        if (option !== "0") {
            let productIndex = Number(option) - 1;
    
            if (productIndex >= 0 && productIndex < products.length) {
            let quantity = Number(prompt(`¿Cuántos ${products[productIndex].name} quieres comprar?`));
            let product = {
                ...products[productIndex],
                quantity: quantity
            };
            cart.push(product);
            alert(`Producto añadido al carrito: ${product.name}`);
            console.log(`Producto añadido al carrito: ${product.name}`);
    
            alert(`La cantidad que compraste: ${product.quantity}`);
            console.log(`La cantidad que compraste: ${product.quantity}`);
            } else {
            alert("Esa opción no es válida. Inténtalo nuevamente.")
            }
        }
        }

        alert("Estimado cliente:\nPara los productos como las medias u otros similares, el precio unitario equivale a un pack x3")
        console.log("-------------------\nEstimado cliente:\nPara los productos como las medias u otros similares, el precio unitario equivale a un pack x3")

        console.log("--- RESUMEN DE COMPRA ---");
        let total = 0;

        for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        total += product.price * product.quantity;
        }

        let igv = total * 0.18;
        let subtotal = total - igv;

        alert(`Subtotal: S/ ${subtotal.toFixed(2)}`);
        console.log(`Subtotal: S/ ${subtotal.toFixed(2)}`);
        alert(`IGV (18%): S/ ${igv.toFixed(2)}`);
        console.log(`IGV (18%): S/ ${igv.toFixed(2)}`);
        alert(`Total a pagar : S/ ${total.toFixed(2)}`);
        console.log(`Total a pagar : S/ ${total.toFixed(2)}`);
    }

  //EJECUTAR COMPRA DE PRODUCTOS
    buyProducts();

//! ESCOGE COLOR 

while(true){
    let colour = prompt("Elige un color (negro, rosa, marron y plateado)").toString().toUpperCase();
    let size = prompt("Ahora, elige una medida (S, M, L, XL)").toString().toUpperCase();

    switch (colour) {
        case "NEGRO":
            alert(`Has elegido el color ${colour} en talla ${size}`);
            break;
        case "AZUL":
            alert(`Has elegido el color ${colour} en talla ${size}`);
            break;
        case "GUINDA":
            alert(`Has elegido el color ${colour} en talla ${size}`);
            break;
        case "BLANCO":
            alert(`Has elegido el color ${colour} en talla ${size}`);
            break;
        default:
            alert("Ingresaste un color no válido");
        continue;
    }
    break;
}

alert ("Agredecemos tu preferencia. \nEsperamos verte de nuevo pronto.")