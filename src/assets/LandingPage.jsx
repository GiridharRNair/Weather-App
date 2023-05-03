import React, { useEffect, useState, useCallback } from "react";
import WeatherLatLon from "./WeatherLatLon";
import BottomTile from "./BottomTile";
import LocationClock from './LocationClock.jsx';

function LandingPage() {

  const cx = import.meta.env.VITE_CX;
  const googleAPIKey = import.meta.env.VITE_API_KEY;
  
  const [data, setData] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLatitude(latitude);
      setLongitude(longitude);
      const weather = new WeatherLatLon(latitude, longitude);
      const data = await weather.getData();
      setData(data);
      changeBackground(data.name);
    } catch (error) {
      console.error("Error getting user location:", error);
      setLatitude(32.7668);
      setLongitude(-96.7836);
      const weather = new WeatherLatLon(51.5085, -0.1257);
      const data = await weather.getData();
      setData(data);
      changeBackground(data.name);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function changeBackground(location) {
    const backgroundUrl = `https://www.googleapis.com/customsearch/v1?key=${googleAPIKey}&cx=${cx}&q=${location}+skyline+1080p&searchType=image`;
      fetch(backgroundUrl)
        .then(response => response.json())
        .then(data => {
          document.body.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${data.items[0].link}) no-repeat center center fixed
          `;
          document.body.style.backgroundSize = "cover";
        })
        .catch(error => {
          console.log(error);
          document.body.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(./DefaultImage.jpeg) no-repeat center center fixed
          `;
          document.body.style.backgroundSize = "cover";
        })
    }

  return (
    <>
      {data ? 
        <>
          <LocationClock lat={latitude} lon={longitude}/>
          <div className="text-7xl font-bold">
            <h1>{data.name}</h1>
          </div>
          <div className="py-5 text-7xl font-bold">
            <h1>{data.main.temp.toFixed()}°F</h1>
          </div>
          <div className="text-3xl">
            <p>{data.weather[0].main}</p>
          </div>
          <div className="flex flex-col pt-6 gap-4 sm:flex-row">
            <BottomTile title={"Feels Like"} info={data.main.feels_like.toFixed() + "°F"}/>
            <BottomTile title={"Humidity"} info={data.main.humidity + "%"}/>
            <BottomTile title={"Wind Speed"} info={data.wind.speed.toFixed() + " MPH"}/>
          </div>
          <div className="flex flex-col pt-5 gap-4 sm:flex-row">
            <BottomTile title={"Air Pressure"} info={data.main.pressure.toFixed() + " hPa"}/>
            <BottomTile title={"Sunrise"} info={new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US')}/>
            <BottomTile title={"Sunset"} info={new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US')}/>
          </div>
        </>
      : null}
    </>
  );
}

export default LandingPage;