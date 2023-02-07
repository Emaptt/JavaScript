// clases

function Producto (tipo, cantidad,precio){
    this.tipo = tipo;
    this.cantidad = cantidad;
    this.precio = precio;
}

//funciones

function precioProducto (tipo) {
    switch (tipo){
        case "Ejecutivo": 
            return 70;
        
        case "2da Clase":
            return 150;

        case "1ra Clase":
            return 300;

        case "Standard":
            return 160;
        
        case "De Lujo":
            return 240;

        case "Suite":
            return 350;
    }
}

function borrarCarro(){
    carro.innerHTML = "";
    total.innerHTML = "";
   
}

function borrarArrays(){
    productos =[];
    preciosSumados =0;
    localStorage.clear();
}

function sumarPrecios(){
    for (producto of productos) {
        preciosSumados += producto.precio;
    }
    
}

function renderizarTabla(productos){
    
    borrarCarro();
    
    productos.forEach( (producto) => {

        const tr = document.createElement("tr");
        const tdCantidad= document.createElement("td");
        const tdTipo = document.createElement("td");
        const tdPrecio = document.createElement("td");
        
        tdCantidad.innerHTML =`${producto.cantidad} X`;
        tdTipo.innerHTML = ` ${producto.tipo}`;
        tdPrecio.innerHTML = `$${producto.precio}`;

        tr.append (tdCantidad);
        tr.append (tdTipo);
        tr.append (tdPrecio);

        carro.append (tr);
    });
    
    preciosSumados=0;
    const totalPrecio = document.createElement ("p");
    sumarPrecios();
    totalPrecio.innerHTML = `Total: $${preciosSumados}`;
    total.append (totalPrecio);
}

function guardarCarro (){
    localStorage.setItem("carro", JSON.stringify(productos));
    console.log(productos);
}

function leerCarro(){
    let carro = [];
    let carrito = localStorage.getItem("carro");
    if (carrito !== null){
        carro = JSON.parse(carrito);
    }

    return carro;
}

// variables

let tipoPasaje = document.getElementById("pasaje");
let cantidadPasaje = document.getElementById("cantidadPasaje");
let tipoHabitacion = document.getElementById("habitacion");
let cantidadHabitacion = document.getElementById("cantidadHabitacion");
let seguro = document.getElementById("seguro");
const btnAgregarPasaje = document.getElementById("btnAddPasaje");
const btnAgregarHabitacion = document.getElementById("btnAddHabitacion");
const btnAgregarSeguro = document.getElementById("btnAddSeguro");
const btnBorrar = document.getElementById("btnBorrar");
const btnComprar = document.getElementById("btnComprar")
const carro = document.getElementById("carroProductos");
const total = document.getElementById("total");

let preciosSumados=0;

//inicio programa

let productos = leerCarro();

renderizarTabla(productos);

btnAgregarPasaje.onclick = () => {
    let tipo = tipoPasaje.value;
    let cantidad = cantidadPasaje.value;
    let precio = (precioProducto(tipo) * cantidad);

    productos.push(new Producto (tipo,cantidad,precio));
    renderizarTabla(productos);
    guardarCarro();
}

btnAgregarHabitacion.onclick = () => {
    let tipo = tipoHabitacion.value;
    let cantidad = cantidadHabitacion.value;
    let precio = (precioProducto(tipo) * cantidad);

    productos.push(new Producto (tipo,cantidad,precio));
    renderizarTabla(productos);
    guardarCarro();
}

btnAgregarSeguro.onclick = () => {

    switch (seguro.value){
        case "true":
            let tipo = "Seguro";
            let cantidad = 1;
            let precio = 200;

            productos.push(new Producto (tipo,cantidad,precio));
            renderizarTabla(productos);
            guardarCarro();
            break;

        case"false":
            break;
    }
}

btnBorrar.onclick = () => {borrarCarro() ; borrarArrays()};

btnComprar.onclick = () =>{ if(preciosSumados!==0){
    swal("¡Compra exitosa!",`Compra realizada por un total de $${preciosSumados}`,"success") 
} else {swal("Su carro esta vacío","Agregue productos al carrito y luego realice la compra","error")}};