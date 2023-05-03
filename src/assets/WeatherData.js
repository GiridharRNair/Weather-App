class WeatherData {
    constructor(location) {
      this.openWeatherKey = import.meta.env.VITE_WEATHER_KEY;
      this.weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${this.openWeatherKey}`;
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
  
  export default WeatherData;
  