<template>
  <div id="container">
    <div>
      <h1 id="header">{{ currentWeather.location }}</h1>
    </div>
    <div id="body">
        <div id="block-center">
          <div class="group-icon">
          <img :src="currentWeather.iconURL" alt="">
          <p id="weather-description">{{ currentWeather.weatherDescription.main }}</p>
        </div>
        <div class="group-temperature">
          <p class="temperature-number">{{ temperatureCelsius }}°C</p>
          <div class="group-btn">
            <button class="btns-temperature">°C</button>
            <button class="btns-temperature">°F</button>
          </div>
        </div>
        <p class="feels-like">Feels like: {{ currentWeather.feelsLike }}</p>
      </div>
      <div id="block-bottom">
        <div>
          <p>Humidity: {{ currentWeather.humidity }}%</p>
          <p>Wind: {{ currentWeather.windSpeed }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentWeather: {
      type: Object,
      required: true
    }
  },

  computed: {
    temperatureCelsius () {
      return Math.round(this.currentWeather.temperatureKelvin - 273.15)
    },
    temperatureFahrenheit () {
      return Math.round(this.currentWeather.temperatureKelvin * 1.8 - 459.67)
    }
  }
}
</script>
<style scoped>
  #container {
    display: flex;
    flex-direction: column;

    width: 660px;
    height: 330px;
    margin: 65px auto 0 auto;

    background-color: white;
    opacity: .8;
  }
  #header {
    margin: 0;
    padding: 10px 0 10px 0;

    text-align: center;
    font-size: 32px;
    color: white;

    background-color: #2C8C99;
  }
  #body {
    display: flex;
    flex-direction: column;
  }

  #block-center {
    display: flex;
    justify-content: center;

    margin-top: 25px;
  }

  .group-icon {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 10px;
  }
  #weather-description {
    position: absolute;
    top: 85px;
    margin: 0;

    font-size: 20px;
  }

  .group-temperature {
    margin: 25px 0;
  }
  .temperature-number {
    margin: 0;

    text-align: center;
    font-size: 70px;
  }

  .group-btn {
    display: flex;
    justify-content: center;
  }
  .btns-temperature {
    margin: 0 5px;

    font-size: 17px;

    border: none;
  }
  .btns-temperature:hover {
    background-color: #2C8C99;
    color: white;
  }

  .feels-like {
    align-self: flex-end;

    margin: 0 5px 25px 5px;
  }

  #block-bottom {
    display: flex;
    justify-content: flex-end;

    margin-right: 15px;

    font-size: 18px;
  }
</style>
