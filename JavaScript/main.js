class Pax {
    constructor (nombre, apellido, edad, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
    } 
}

function ingresarPax(){

    for (let i=1; i<= cantidadPax; i++){
        let nombre = prompt ("Ingrese el nombre de la persona " + i );
        let apellido = prompt ("Ingrese el apellido de la persona " + i);
        let edad = prompt ("Ingrese la edad de la persona " + i);
        let dni = prompt ("Ingrese el número de documento de la persona " + i);
    
        personas.push (new Pax (nombre, apellido, edad, dni));
    }
}

function informacionArrayPax(){
    
    personas.forEach ( (persona) => {
        alert (`Los datos ingresados son:
    Nombre: ${persona.nombre} ${persona.apellido} 
    Edad: ${persona.edad}
    DNI: ${persona.dni}`)
    })
};


const personas = []

let cantidadPax = parseInt (prompt ("Ingrese con números la cantidad de personas que viajan"));

ingresarPax();

informacionArrayPax();

let mensaje = prompt ("Si desea modificar los datos de alguna persona escriba volver, sino escriba continuar").toLowerCase();

while (mensaje !== "continuar"){

    switch (mensaje){

        case "volver":
            const personaAModificar = personas [(parseInt (prompt ("Ingrese el numero de la persona a modificar"))) - 1];

            if (personas.indexOf (personaAModificar) == -1){

                alert ("El numero de la persona no se encuentra en la lista");

            } else {

                personas.splice (personas.indexOf (personaAModificar), 1 );

                cantidadPax = parseInt (prompt ("Ingrese con números la cantidad de personas que quiere agregar"));

                ingresarPax();

                informacionArrayPax()

            }

            break;

        default:
            alert ("Los datos ingresados son incorrectos, por favor intente nuevamente");
            break;
    }

    mensaje = prompt ("Si desea modificar los datos de alguna persona escriba volver, sino escriba continuar").toLowerCase();
}


let cantidadHabitaciones = parseInt (prompt (`Ingrese en numeros la cantidad de habitaciones que desea reservar. 
Puede ser entre ${Math.round(personas.length / 2)} o ${personas.length} ya que cada una tiene un cupo de 2 personas.`));

alert (`Usted reservó ${cantidadHabitaciones} habitaciones para ${personas.length} personas`)