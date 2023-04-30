import React, { useState } from "react";
import LocalClock from "./LocalClock.jsx"
import LocationClock from "./LocationClock.jsx";

function App() {
  const [data, setData] = useState('')
  const [location, setLocation] = useState('')
  const [placeHolder, setPlaceHolder] = useState('Enter City Name')

  const cx = import.meta.env.VITE_CX
  const googleAPIKey = import.meta.env.VITE_API_KEY;
  const openWeatherKey = import.meta.env.VITE_WEATHER_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${openWeatherKey}`

  function searchLocation (event) {
    if (event.key === 'Enter') {
      fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
          setData(data)
          if (data.name != undefined) {
            changeBackground()
            setPlaceHolder('Enter City Name')
          }
          else
            setPlaceHolder('Invalid Location')
        })
        .catch(error => {
          console.log(error)
        })
      setLocation('')
    }
  }

  function changeBackground() {
    const backgroundUrl = `https://www.googleapis.com/customsearch/v1?key=${googleAPIKey}&cx=${cx}&q=${location}&searchType=image`
    fetch(backgroundUrl)
      .then(response => response.json())
      .then(data => {
        var ele = document.getElementsByClassName("app")[0]
        ele.style.backgroundImage = `linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ), url(${data.items[0].link})`;
      })
      .catch(error => {
        console.log(error);
        var ele = document.getElementsByClassName("app")[0]
        ele.style.backgroundImage = `linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ), url(/public/DefaultImage.jpeg)`;
      })
  }

  return (
    <div className="app">
      {data.name === undefined &&
      <div className="startSearch">
        <div className="localClock">
          <LocalClock />
        </div>
        <input className="startInput"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder={placeHolder}
          type="text" />       
      </div>
      }
      {data.name !== undefined &&
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder={placeHolder}
          type="text"/>
      </div>
      }
      <div className="container">
        <div className="top">
          <div className="locationClock">
            {data.main ? <LocationClock lat={data.coord.lat} lon={data.coord.lon} /> : null}
          </div>
          <div className="location">
            <h1>{data.name}</h1>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App
