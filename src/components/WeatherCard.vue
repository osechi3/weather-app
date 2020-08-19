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
          <p
            v-if="isCelsius"
            class="temperature-number">{{ this.currentWeather.temperatureKelvin | toCelsius }}
          </p>
          <p
            v-else
            class="temperature-number">{{ this.currentWeather.temperatureKelvin | toFahrenheit }}
          </p>
          <div class="group-btn">
            <button
              class="btns-temperature"
              type="button"
              @click="(isCelsius = true)">°C
            </button>
            <button
              class="btns-temperature"
              type="button"
              @click="(isCelsius = false)">°F
            </button>
          </div>
        </div>
        <p
          v-if="isCelsius"
          class="feels-like">Feels like: {{ currentWeather.feelsLike | toCelsius }}
        </p>
        <p
          v-else
          class="feels-like">Feels like: {{ currentWeather.feelsLike | toFahrenheit }}
        </p>
      </div>
      <div id="block-bottom">
        <div class="group-time">
          <label>Time:</label>
          <p id="current-time">{{ currentTime }}</p>
        </div>
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
  filters: {
    toCelsius (value) {
      return Math.round(value - 273.15) + '°C'
    },
    toFahrenheit (value) {
      return Math.round(value * 1.8 - 459.67) + '°F'
    }
  },

  props: {
    currentWeather: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isCelsius: true
    }
  },

  computed: {
    currentTime () {
      const currentLocalTimeMs = new Date().getTime()
      const localOffsetUTCMs = new Date().getTimezoneOffset() * 60 * 1000
      const currentUTCTime = currentLocalTimeMs + localOffsetUTCMs
      const desiredTime = currentUTCTime + this.currentWeather.timezoneShift * 1000
      let desiredTimeHours = new Date(desiredTime).getHours()
      let desiredTimeMinutes = new Date(desiredTime).getMinutes()

      if (desiredTimeHours < 10) (desiredTimeHours = '0' + desiredTimeHours)
      if (desiredTimeMinutes < 10) (desiredTimeMinutes = '0' + desiredTimeMinutes)

      console.log(desiredTimeHours + ':' + desiredTimeMinutes)
      return desiredTimeHours + ':' + desiredTimeMinutes
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
    border: 3px solid #2C8C99;
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
    justify-content: space-between;

    margin-right: 15px;

    font-size: 18px;
  }
  .group-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
  #current-time {
    margin: 0 0 7px 10px;

    font-size: 32px;
  }
</style>
