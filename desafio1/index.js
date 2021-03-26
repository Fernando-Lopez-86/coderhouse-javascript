let numero = prompt('Ingrese un numero')
numero = parseInt(numero)

if(numero){
    if(numero % 2 === 0){
        alert('El numero ' + numero + ' es par')
    }else{
        alert('El numero ' + numero + ' es impar')
    }
}else{
    alert('Ingrese un valor correcto')
}