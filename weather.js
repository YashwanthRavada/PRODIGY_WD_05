document.getElementById('getWeatherBtn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const location = document.getElementById('locationInput').value.trim();
    
    if (location === '') {
        alert('Please enter a location.');
        return;
    }

    fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
            if (data && data[0]) {
                const { lat, lon } = data[0];
                fetchWeatherData(lat, lon, location);
            } else {
                displayError('Location not found');
            }
        })
        .catch(() => displayError('Error fetching location data'));
}

function fetchWeatherData(lat, lon, location) {
    fetch(`https://wttr.in/${lat},${lon}?format=%t,%h,%w,%c`)
        .then(response => response.text())
        .then(data => {
            const [temperature, humidity, windSpeed, description] = data.split(', ');
            displayWeather({ temperature, humidity, windSpeed, description }, location);
        })
        .catch(() => displayError('Error fetching weather data'));
}

function displayWeather(data, location) {
    document.getElementById('location').innerText = `Location: ${location}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.temperature}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.humidity}`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.windSpeed}`;
    document.getElementById('description').innerText = `Weather: ${data.description}`;
}

function displayError(message) {
    document.getElementById('location').innerText = message;
    document.getElementById('temperature').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('windSpeed').innerText = '';
    document.getElementById('description').innerText = '';
}
