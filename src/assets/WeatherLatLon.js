class WeatherLatLon {
    constructor(lat, lon) {
      this.openWeatherKey = import.meta.env.VITE_WEATHER_KEY;
      this.weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.openWeatherKey}`;
    }
  
    getData() {
      return fetch(this.weatherUrl)
        .then(response => response.json())
        .then(data => {
          if (data.name !== undefined) {
            return data;
          } else {
            return 'Invalid Location';
          }
        })
        .catch(error => {
          console.error(error);
          return 'Error retrieving weather data';
        });
    }
  }
  
  export default WeatherLatLon;
  