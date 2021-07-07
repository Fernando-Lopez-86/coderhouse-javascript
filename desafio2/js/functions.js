
function mostrarMensaje() {

    let tipo = document.getElementById("tipo").value;
    let pesos = document.getElementById("pesos").value;


    switch (tipo) {
        case "dolar":
            let resultadodolar = pesos * 141;
            return alert("Cotizacion en dolares: " + resultadodolar);
            break;
        case "euro":
            let resultadoeuro = pesos * 176;
            return alert("Cotizacion en euros: " + resultadoeuro);
            break;
    }
}
