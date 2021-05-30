

if(localStorage.length !== 0) {
    getStorage();
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