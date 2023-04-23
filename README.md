# Weather-App

<img width="720" alt="Screenshot 2023-04-11 at 11 51 46 AM" src="https://user-images.githubusercontent.com/49298134/231234294-4f0fdb5f-d927-4a64-8f92-411d78502068.png">

This is a weather app created using Vite + React, Google Image Search API, and OpenWeatherMap API. </br>
It displays the current time of the user's location, time of the inputed location, weather of the location, what the weather actually feels like, humidity, and wind speed. </br>

<ins>Technologies</ins> </br>
Vite </br>
React </br>
Axios </br>
Google Image Search API </br>
OpenWeatherMap API </br>

<ins>Features</ins> </br>
User's current location is detected and displayed </br>
Weather information is fetched using OpenWeatherMap API </br>
Google Image Search API is used to display a relevant background image based on the weather condition </br>
Displays the current time of the user's location </br>
Displays the actual feels-like temperature, humidity, and wind speed </br>

<ins>Run Locally</ins> </br>
Clone the project
```bash
  git clone https://github.com/SyntaxWarrior30/Weather-App
```
Go to the project directory
```bash
  cd Weather-App
```
Install dependencies
```bash
  npm install
```
Rename .env.exmaple to .env and input your Google Search Engine ID & Google API key. </br>
```
VITE_CX={Your Google Search Engine ID}
VITE_API_KEY={Your Google API key}
```
Run the development server
```bash
  npm run dev
```

