
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


$(document).ready(function() {
    //$("body").prepend('<button id="btn1">ENVIAR API</button>');
    //Escuchamos el evento click del botón agregado
    //$("#btn1").click(() => { 
        $.ajax({
            url: 'https://api.estadisticasbcra.com/tasa_prestamos_personales',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTMwMDE0MDgsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJmZXJkaW5hbmRvbG9wZXpAaG90bWFpbC5jb20ifQ.9-B8MqDLUdWHfW8gPVc7I7IG28-FJGsGwoAhrA62AoebM26JpPtx7sSWma7k1hviyxNJa0MBwdCFIENnLbNgSQ');
            },
            data: {},
            success: function(respuesta){
                console.log(respuesta);
                /*let year = new Date().getFullYear();
                let month = new Date().getMonth() + 1;
                let month2 = ((new Date().getMonth()+1)< 10) ? '0'+ month : '';
                let date = new Date().getDate()-2;
                let yesterday = year + "-" + month2 + "-" + date;
                let x = respuesta[1];*/

                let x = JSON.stringify(respuesta[respuesta.length-1]);
                let fecha = x.substring(6,16)
                let tasa = x.substring(22,27)
                $("body").prepend(`<div>Tasa prestamos BCRA: <b>${tasa}<b></div>`);
                $("body").prepend(`<div>Fecha tasa de interes: <b>${fecha}</b></div>`);

                console.log(x)
            },
            error: function () { },
        });
    //});
});






