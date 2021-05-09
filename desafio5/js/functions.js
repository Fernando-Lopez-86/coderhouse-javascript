
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


if(localStorage.length !== 0) {
    getStorage();
}


let persona = {};

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
    /*let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let nacimiento = document.getElementById("nacimiento").value;
    let importe = document.getElementById("importe").value;
    let plazo = document.getElementById("combo-plazo").value;
    let valorcuota = "";*/
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let dni = $("#dni").val();
    let direccion = $("#direccion").val();
    let telefono = $("#telefono").val();
    let nacimiento = $("#nacimiento").val();
    let importe = $("#importe").val();
    let plazo = $("#combo-plazo").val();
    let valorcuota = "";

    persona = new Persona(nombre, apellido, dni, direccion, telefono, nacimiento, importe, plazo);

    switch (plazo) {
        case "6 meses":
            valorcuota = persona.importe * 1.4;
            break;
        case "12 meses":
            valorcuota = persona.importe * 1.6;
            break;
        case "18 meses":
            valorcuota = persona.importe * 1.8;
            break;
        case "24 meses":
            valorcuota = persona.importe * 2;
            break;
    }
    mostrarResultado(persona, valorcuota);
    localStorage.clear() 
}


function mostrarResultado(persona, valorcuota) {
    /*let resultado = document.getElementById("resultado");
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
    resultado.appendChild(parrafo);*/
    $("#resultado").append(`<div>Nombre: ${persona.nombre}</div>
                            <div>Apellido: ${persona.apellido}<div>
                            <div>Dni: ${persona.dni}<div>
                            <div>Direccion: ${persona.direccion}<div>
                            <div>Telefono: ${persona.telefono}<div>
                            <div>Nacimiento: ${persona.nacimiento}<div>
                            <div>Importe: ${persona.importe}<div>
                            <div>Plazo: ${persona.plazo}<div>
                            <div>Cuota: ${valorcuota}<div>`); 
}


//////////// Guardar en el Storage cuando se dispara el evento que detecta modificaciones en algun input//////// 
/*const nombreChange = document.getElementById('nombre');
nombreChange.addEventListener('input', (evt) => {    
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let nacimiento = document.getElementById("nacimiento").value;
    let importe = document.getElementById("importe").value;
    let plazo = document.getElementById("combo-plazo").value;
    let valorcuota = "";*/


$("input[type='text']").change((e) => {
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let dni = $("#dni").val();
    let direccion = $("#direccion").val();
    let telefono = $("#telefono").val();
    let nacimiento = $("#nacimiento").val();
    let importe = $("#importe").val();
    let plazo = $("#combo-plazo").val();
    let valorcuota = "";

    console.log(nombre);
    
    persona = new Persona(nombre, apellido, dni, direccion, telefono, nacimiento, importe, plazo);

    const inputsJSON = JSON.stringify(persona);
    localStorage.setItem("persona", inputsJSON);
});


/////////// Obtener valores del Storage ///////////
function getStorage() {
    console.log(localStorage.length);
    if(localStorage){
        let persona = JSON.parse(localStorage.getItem("persona"));

        if(persona){
            document.getElementById("nombre").value = persona.nombre;
            document.getElementById("apellido").value = persona.apellido;
            document.getElementById("dni").value = persona.dni;
            document.getElementById("direccion").value = persona.direccion;
            document.getElementById("telefono").value = persona.telefono;
            document.getElementById("nacimiento").value = persona.nacimiento;
            document.getElementById("importe").value = persona.importe;
            document.getElementById("combo-plazo").value = persona.plazo;
        }
    }
}

