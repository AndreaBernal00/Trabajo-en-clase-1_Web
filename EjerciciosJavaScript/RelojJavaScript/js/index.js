/* Ejercicio una función que permite mostrar el reloj
en el elemento HTML con id="reloj" al presionar el botón con id="mostrar" */

function reloj() {
    let fecha = new Date(); // muestra en pantalla la fecha y la hora actuales
    let año = fecha.getFullYear();
    let mes = (fecha.getMonth()+1);
    let dia = fecha.getDate();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    mes = (mes < 10 ? "0":"") + mes;
    dia = (dia <10 ? "0":"") + dia;
    hora = (hora <10 ? "0":"") + hora;
    minutos = (minutos <10 ? "0":"") + minutos;
    segundos = (segundos < 10 ? "0" : "") + segundos;
    document.getElementById("reloj").innerText = ""+dia+"/"+mes+"/"+año+" "+hora+":"+minutos+":"+segundos+""

    setTimeout("reloj()",1000)
}

reloj()
setInterval(reloj,1000)
// Agregar el evento click al botón
//document.getElementById("mostrar").addEventListener("click", reloj);