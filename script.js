let api_url = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '0677ef8a96da00f2f92cd5c21c1f3165';
let difKelvin = 273.15

const ciudadEntrada = document.getElementById('ciudadEntrada');
const botonBusqueda = document.getElementById('botonBusqueda');

ciudadEntrada.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const city = ciudadEntrada.value;
        if (city) {
            fetchDatosClima(city);
        }
    }
});

botonBusqueda.addEventListener('click', () => {
    const city = ciudadEntrada.value;
    if (city) {
        fetchDatosClima(city);
    }
});

function fetchDatosClima(city) {
    fetch(`${api_url}?q=${city}&appid=${api_key}`)
        .then(response => response.json())
        .then(response => mostrarDatosClima(response));
};

function mostrarDatosClima(response) {
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = '';

    const ciudadNombre = response.name;
    let ciudadPais = response.sys.country;
    const temperatura = response.main.temp;
    const descripcion = response.weather[0].description;
    const icon = response.weather[0].icon;

    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${ciudadNombre}, ${ciudadPais}`;

    const ciudadTemperatura = document.createElement('p');
    ciudadTemperatura.textContent = `${Math.floor(temperatura - difKelvin)}°C`;
    ciudadTemperatura.style.fontSize = '2rem';

    const temperaturaIcon = document.createElement('img');
    temperaturaIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const ciudadDescripcion = document.createElement('p');
    ciudadDescripcion.textContent = descripcion;

    divDatosClima.appendChild(ciudadTitulo);
    divDatosClima.appendChild(ciudadTemperatura);
    divDatosClima.appendChild(temperaturaIcon)
    divDatosClima.appendChild(ciudadDescripcion);

};
