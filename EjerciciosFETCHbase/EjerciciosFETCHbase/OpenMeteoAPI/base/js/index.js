/*
Consumir el endPoint de la API del clima Open-Meteo: 
- https://open-meteo.com/
- https://open-meteo.com/en/docs
- Ejemplo de petición
https://api.open-meteo.com/v1/forecast?latitude=7.1254&longitude=-73.1198&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3

Características para desarrollar: 
 - Cuando el sitio cargue se debe mostrar un gráfico con datos de prueba y la tabla sin datos
 - Cuando el usuario de click al botón buscar se debe hacer la solicitud de los datos a la API
 - Al recibir la respuesta del servidor se deben mapear los datos en la tabla y en el gráfico.
 - En caso de no encontrar datos o presentar un error se debe reportar por consola"
*/

let base_url = "https://api.open-meteo.com/v1/forecast?";
let end_url = "&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3";

// Función para mapear los datos recibidos de la API
function mapearDatos(data) {
    console.log("Datos recibidos:", data);

    // Verificar si los datos recibidos son válidos
    if (!data || !data.latitude || !data.longitude || !data.current || !data.hourly) {
        console.error("Error: Datos incompletos o inválidos recibidos de la API.");
        return;
    }

    // Actualizar la tabla con los datos recibidos
    document.getElementById("v_lat").innerText = data.latitude;
    document.getElementById("v_long").innerText = data.longitude;
    document.getElementById("v_alt").innerText = data.elevation;
    document.getElementById("v_zone").innerText = data.timezone;
    document.getElementById("v_temp").innerText = data.current.temperature_2m;
    document.getElementById("v_hour").innerText = data.current.time;

    // Actualizar el gráfico con los datos recibidos
    actualizarGrafico(data.hourly.time, data.hourly.temperature_2m);
}

// Función para cargar los datos desde la API
function cargarDatos() {
    let latitude = document.getElementById("latitud").value;
    let longitude = document.getElementById("longitud").value;

    // Validar que se hayan ingresado valores
    if (!latitude || !longitude) {
        console.error("Error: Por favor, ingresa una latitud y longitud válidas.");
        return;
    }

    let url = base_url + "latitude=" + latitude + "&longitude=" + longitude + end_url;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!data) {
                throw new Error("No se recibieron datos de la API.");
            }
            mapearDatos(data);
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });
}

// Función para actualizar el gráfico con los datos recibidos
function actualizarGrafico(labels, data) {
    const ctx = document.getElementById('grafico');

    // Destruir el gráfico anterior si existe
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Crear un nuevo gráfico
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatura (°C)',
                data: data,
                borderWidth: 1,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Agregar listener al botón "buscar_datos"
document.getElementById("buscar_datos").addEventListener('click', cargarDatos);

// Gráfico inicial con datos de prueba
const ctx = document.getElementById('grafico');
window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2025-03-02T00:00', '2025-03-02T01:00', '2025-03-02T02:00', '2025-03-02T03:00', '2025-03-02T04:00'],
        datasets: [{
            label: 'Temperatura (°C)',
            data: [20.3, 20.5, 20.3, 20.1, 19.9, 19.7],
            borderWidth: 1,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});