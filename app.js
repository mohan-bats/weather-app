// Buggy San Francisco Weather App

const API_KEY = "YOUR_API_KEY_HERE";
const city = "San Francisco";

function showTime() {
  // BUG: Shows user's local time instead of San Francisco time
  const now = new Date();
  console.log("Local Time:", now.toLocaleTimeString());
}

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
    );

    const data = await response.json();

    // BUG: Property typo ("tempp" doesn't exist)
    const temperature = data.main.tempp;

    // BUG: Assumes weather array always exists
    const description = data.weather[0].description;

    console.log(
      `Weather in ${city}: ${temperature}°F, ${description}`
    );
  } catch (error) {
    // BUG: Swallows all errors without useful information
    console.log("Something went wrong");
  }
}

showTime();
setInterval(showTime, 1000);

getWeather();
setInterval(getWeather, 60000);
