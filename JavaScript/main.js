let tiempoEspera = 0;
let turnoNumero = 0;
let espera = 0;

function alertaNumero() {
    turnoNumero++;
    alert ("Su numero es " + turnoNumero + " y su tiempo de espera es de " + espera + " minutos.");
    espera = espera + tiempoEspera;
}


let tipoConsulta = prompt("Ingrese su tipo de consulta: Ventas, Atencion o Caja. Sino escriba Cerrar");

while( tipoConsulta !== "Cerrar"){ 

    switch(tipoConsulta){

        case "Ventas":
            tiempoEspera = 15;
            alertaNumero();
            break;

        case "Atencion":
            tiempoEspera = 10;
            alertaNumero();
            break;

        case "Caja":
            tiempoEspera = 5;
            alertaNumero();
            break;

        default:
            alert ("Usted ingreso un tipo de consulta invalido, por favor intente nuevamente")
            break;

    }

    tipoConsulta = prompt("Ingrese su tipo de consulta: Ventas, Atencion o Caja. Sino escriba Cerrar");

}

alert ("Hay " + turnoNumero + " turnos en total y el tiempo de espera es de " + espera + " minutos.");

