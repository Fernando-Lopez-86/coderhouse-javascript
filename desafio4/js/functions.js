
////////////Cargamos el combo plazo del html, con los valores del array plazo de javascript///////////
/*function cargar() {
    const plazo = ['6 meses', '12 meses', '18 meses', '24 meses'];
    const select = document.getElementById("combo-plazo"); //DOM - Seleccionamos el select del html
    
    for(var i=0; i < plazo.length; i++){ 
        let option = document.createElement("option"); //Creamos los elementos options del select
        option.innerHTML = plazo[i]; //Insertamos el texto en los options
        select.appendChild(option); //Metemos la opción en el select
    }
}
cargar();*/
//////////////////////////////////////////////////////////////////////////////////////////////////////

class Persona {
    constructor (nombre, apellido, dni, direccion, telefono, nacimiento, importe, plazo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.direccion = direccion;
        this.telefono = telefono;
        this.nacimiento = nacimiento;
        this.importe = importe;
        this.plazo = plazo;
    }
}

function calcularCredito() {
    event.preventDefault() //evita refrescar la pagina
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let nacimiento = document.getElementById("nacimiento").value;
    let importe = document.getElementById("importe").value;
    let plazo = document.getElementById("combo-plazo").value;
    let valorcuota = null;

    const persona = new Persona(nombre, apellido, dni, direccion, telefono, nacimiento, importe, plazo);

    switch (plazo) {
        case "6 meses":
            valorcuota = persona.importe * 1.4;
            mostrarResultado(persona, valorcuota);
            break;
        case "12 meses":
            valorcuota = persona.importe * 1.6;
            mostrarResultado(persona, valorcuota);
            break;
        case "18 meses":
            valorcuota = persona.importe * 1.8;
            mostrarResultado(persona, valorcuota);
            break;
        case "24 meses":
            valorcuota = persona.importe * 2;
            mostrarResultado(persona, valorcuota);
            break;
    }
}

function mostrarResultado(persona, valorcuota) {
    let resultado = document.getElementById("resultado");
    let parrafo = document.createElement("p");
    parrafo.innerHTML = `<div>Nombre: ${persona.nombre}</div>
                         <div>Apellido: ${persona.apellido}<div>
                         <div>Dni: ${persona.dni}<div>
                         <div>Direccion: ${persona.direccion}<div>
                         <div>Telefono: ${persona.telefono}<div>
                         <div>Nacimiento: ${persona.nacimiento}<div>
                         <div>Importe: ${persona.importe}<div>
                         <div>Plazo: ${persona.plazo}<div>
                         <div>Cuota: ${valorcuota}<div>`;
    resultado.appendChild(parrafo);
    
    /*return alert("SIMULACION CREDITO" + "\n" +
                 "Nombre: " + persona.nombre + "\n" +
                 "Apellido: " + persona.apellido + "\n" +
                 "Nacimiento: " + persona.nacimiento + "\n" +
                 "Importe: " + persona.importe + "\n" +
                 "Plazo: " + persona.plazo + "\n" +
                 "Valor cuota: " + valorcuota + "\n");*/
}
