
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
                xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTMxODEzNDIsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJmZXJkaW5hbmRvbG9wZXpAaG90bWFpbC5jb20ifQ.CkzcFGxP3pFE6TZmgfrLq7EtYhryYFNrG71TdNeTn-W6gNogmGKeQ1bxhtm-Ua_960YA_VRgWnEHGboXLl4Rhg');
            },
            data: {},
            success: function(respuesta){
                console.log(respuesta);

                let x = JSON.stringify(respuesta[respuesta.length-1]);
                let fecha = x.substring(6,16)
                let tasa = x.substring(22,27)
                $(".ajax").prepend(`<div>Tasa prestamos BCRA: <b>${tasa}<b></div>`);
                $(".ajax").prepend(`<div>Fecha tasa de interes: <b>${fecha}</b></div>`);

                console.log(x)
            },
            error: function () { },
        });

        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {
            let latitud = position.coords.latitude;
            let longitud = position.coords.longitude;

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=177759442195e93df08ef48febe22a06&units=metric`,
                type: 'GET',
                data: {},
                success: function(respuesta){
                    console.log(respuesta);
                    //let temperatura = respuesta.weather.0['description'];
                    let temperatura = respuesta.main['temp'];
                    let ciudad = respuesta.name;
                    console.log(temperatura);
                    $(".ajax").prepend(`<div>Temperatura: <b>${temperatura}</b></div>`);
                    $(".ajax").prepend(`<div>Ciudad: <b>${ciudad}</b></div>`);
                },
                error: function () { },
            });
        }
    //});
});




