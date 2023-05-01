import { useState } from 'react';
import LocalClock from './assets/LocalClock.jsx';
import LocationClock from './assets/LocationClock.jsx';
import BottomTile from './assets/BottomTile.jsx';

function App() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState('');
  const [placeHolder, setPlaceHolder] = useState('Enter City Name')
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  const cx = import.meta.env.VITE_CX;
  const googleAPIKey = import.meta.env.VITE_API_KEY;
  const openWeatherKey = import.meta.env.VITE_WEATHER_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${openWeatherKey}`;
  const backgroundUrl = `https://www.googleapis.com/customsearch/v1?key=${googleAPIKey}&cx=${cx}&q=${location}+skyline+1080p&searchType=image`;

  function searchLocation (event) {
    if (event.key === 'Enter') {
      try {
        fetch(weatherUrl)
          .then(response => {
            response.json().then((data) => {
              if (data.name != undefined) {
                changeBackground();
                setPlaceHolder('Enter City Name');
                setData(data);
                getSunriseSunsetTime();
              } else {
                setPlaceHolder('Invalid Location');
              }
            });
          })
        setLocation('');
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  

  function getSunriseSunsetTime () {
    fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US');
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US');
      setSunrise(sunriseTime);
      setSunset(sunsetTime);
    })
    .catch((error) => console.log(error));
  }

  function changeBackground() {
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
    <div className='overflow-auto scrollbar-hide app flex flex-col py-5 h-screen items-center'>
      <div className="relative flex w-[90vw] h-[3vw] flex-wrap items-stretch">
        <input
          title="Searchbar"
          type="text"
          className="bg-slate-600 relative rounded-lg m-0 text-white -mr-0.5 block w-[1px] min-w-0 flex-auto text-center border border-solid border-neutral-300 bg-opacity-70 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
          value={location}
          placeholder={placeHolder}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation} />
      </div>
      <div className='flex pt-5 flex-col items-center'>
      {data.name ? 
        <>
          <LocationClock lat={data.coord.lat} lon={data.coord.lon} /> 
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
            <BottomTile title={"Sunrise"} info={sunrise}/>
            <BottomTile title={"Sunset"} info={sunset}/>
          </div>
        </>
      : <LocalClock/>}
      </div>
      <div title="Go to site's Github" className='fixed bottom-1 right-2'>
        <a href="https://github.com/SyntaxWarrior30/Weather-App" target="_blank" rel="noopener noreferrer">
          <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="#FFFFFF"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
                />
              </svg>
          </button>
        </a>
      </div>  
    </div>
  )
}

export default App
