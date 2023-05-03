# Weather-App

<img width='800' src="./public/UserInterface.png"/>


This is a simple responsive weather application that provides weather information for a user-specified location. The application features a dynamic background that changes based on the user's location.

## Usage

The first page of the application displays weather information for the user's location. If location tracking is turned off, the default location is set to London. The user can search for weather information for any other location by entering the name of the city.

## Run Locally

Clone the project
```bash
  $ git clone https://github.com/SyntaxWarrior30/Weather-App
```
Go to the project directory
```bash
  $ cd Weather-App
```
Install dependencies
```bash
  $ npm install
```
Rename `.env.exmaple` to `.env` and input your Google Search Engine ID & Google API key. </br>
```
VITE_CX={Your Google Search Engine ID}
VITE_API_KEY={Your Google API key}
VITE_WEATHER_KEY={Your OpenWeather API Key}
```
Run the development server
```bash
  $ npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

