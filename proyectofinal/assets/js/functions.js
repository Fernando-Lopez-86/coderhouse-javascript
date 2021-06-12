

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















