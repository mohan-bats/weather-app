<!DOCTYPE html>
<html>
<head>
  <title>Buggy SF Weather App</title>
</head>
<body>
  <h1>San Francisco Weather</h1>

  <p id="time">Loading local time...</p>
  <p id="weather">Loading weather...</p>

  <script>
    const city = "San Francisco";
    const apiKey = "YOUR_API_KEY_HERE";

    function updateTime() {
      // Bug: Uses user's local time, not San Francisco time
      const now = new Date();
      document.getElementById("time").innerText =
        "Local Time: " + now.toLocaleTimeString();
    }

    async function getWeather() {
      // Bug: API URL is missing proper encoding and units may not work
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

      const response = await fetch(url);

      // Bug: No error handling if API key is invalid or request fails
      const data = await response.json();

      // Bug: Typo in property name: "tempp" should be "temp"
      const temp = data.main.tempp;

      document.getElementById("weather").innerText =
        `Weather: ${temp}°F, ${data.weather[0].description}`;
    }

    updateTime();
    setInterval(updateTime, 1000);

    getWeather();
  </script>
</body>
</html>
