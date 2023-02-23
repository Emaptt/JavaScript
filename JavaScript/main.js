// clases

function Producto (tipo, cantidad,precio){
    this.tipo = tipo;
    this.cantidad = cantidad;
    this.precio = precio;
}

// funciones

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

function agregarAlCarro(tipo, cantidad, precio){
    if (tipo !== "Seleccione una opción" && cantidad !== 0){

        buscarEnArray(tipo, cantidad, precio);
        renderizarTabla(productos);
        guardarCarro();

    } else { swal("Error","Verifique lo ingresado y vuelva a intentar","error")}
}

function renderizarTarifario(productos){

    productos.forEach( (producto) => {

        const p = document.createElement("p");

        p.innerHTML = `<strong>${producto.tipo} </strong> $${producto.precio}`

        pTarifario.append (p);
    });
}

function renderizarTabla(productos){

    borrarCarro();

    productos.forEach( (producto) => {

        const tr = document.createElement("tr");
        const tdCantidad= document.createElement("td");
        const tdTipo = document.createElement("td");
        const tdPrecio = document.createElement("td");

        tdCantidad.innerHTML =`${producto.cantidad}`;
        tdTipo.innerHTML = ` ${producto.tipo}`;
        tdPrecio.innerHTML = `$${producto.precio}`;

        tr.append (tdCantidad);
        tr.append (tdTipo);
        tr.append (tdPrecio);

        carro.append (tr);
    });

    preciosSumados=0;
    const totalPrecio = document.createElement ("h3");
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

function buscarEnArray(tipo, cantidad, precio){
    if (productoExiste(tipo)){
        productos[indexProducto(tipo)].cantidad += cantidad;
        productos[indexProducto(tipo)].precio += precio;
    } else { productos.push(new Producto (tipo,cantidad,precio)) }
}

function productoExiste(tipo){
    let existe = false;

    for (const producto of productos){
        if (producto.tipo === tipo){
            existe = true;
            break;
        }
    }

    return existe;
}

function indexProducto(tipo){
    indiceProducto = 0
    for (i=0; i < productos.length; i++){
        if (productos[i].tipo === tipo){
            indiceProducto = i;
            break;
        }
    }

    return indiceProducto;
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
const pTarifario = document.getElementById ("tarifario");

let preciosSumados=0;

//inicio programa

fetch ("/productos.json")
.then ((resp) => resp.json())
.then((respuesta) => renderizarTarifario(respuesta));

let productos = leerCarro();

renderizarTabla(productos);

btnAgregarPasaje.onclick = () => {
    let tipo = tipoPasaje.value;
    let cantidad = parseInt(cantidadPasaje.value);
    let precio = (precioProducto(tipo) * cantidad);

    agregarAlCarro(tipo, cantidad, precio);
}

btnAgregarHabitacion.onclick = () => {
    let tipo = tipoHabitacion.value;
    let cantidad = parseInt(cantidadHabitacion.value);
    let precio = (precioProducto(tipo) * cantidad);

    agregarAlCarro(tipo, cantidad, precio);
}

btnAgregarSeguro.onclick = () => {

    if (!productoExiste("Seguro")){

        switch (seguro.value){
        case "true":
            let tipo = "Seguro";
            let cantidad = 1;
            let precio = 200;

            agregarAlCarro(tipo, cantidad, precio);
            break;

        case"false":
            break;
        }
    } else {swal("Aviso","Solo puede agregar un seguro por viaje","info")}

    
}

btnBorrar.onclick = () => {borrarCarro() ; borrarArrays()};

btnComprar.onclick = () =>{ if(preciosSumados!==0){
    swal("¡Compra exitosa!",`Compra realizada por un total de $${preciosSumados}`,"success");
    borrarArrays();
    borrarCarro();
} else {
    swal("Su carro esta vacío","Agregue productos al carrito y luego realice la compra","error")}};

