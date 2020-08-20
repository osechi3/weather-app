<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <img id="background-img" :src="backgroundImg" alt="" :key="backgroundImg">
    </transition>
    <app-search-block
      :isNotFound="isNotFound"
      :isUnknownError="isUnknownError"
      @get-weather-btn-clicked="getWeather($event)">
    </app-search-block>
    <app-weather-card
      :currentWeather="currentWeather"
      v-if="isWeatherCardShown">
    </app-weather-card>
  </div>
</template>

<script>
import SearchBlock from './components/SearchBlock'
import WeatherCard from './components/WeatherCard'
import images from './assets/background-images-export.js'

import { openWeatherAPIKey } from '../apikeys'

export default {
  name: 'App',
  components: {
    appSearchBlock: SearchBlock,
    appWeatherCard: WeatherCard
  },

  data () {
    return {
      currentWeather: {
        location: '',
        humidity: '',
        windSpeed: '',
        temperatureKelvin: '',
        feelsLike: '',
        timezoneShift: '',
        weatherDescription: '',
        iconURL: ''
      },

      weatherCondition: '',
      backgroundImages: {
        default: images[0],
        clear: images[1],
        rain: images[2],
        snow: images[3],
        atmosphere: images[4],
        thunder: images[5]
      },

      isWeatherCardShown: false,
      isNotFound: false,
      isUnknownError: false
    }
  },

  computed: {
    backgroundImg () {
      if (this.weatherCondition === 'Clouds' ||
          this.weatherCondition === 'Clear') {
        return this.backgroundImages.clear
      } else if (this.weatherCondition === 'Rain' ||
          this.weatherCondition === 'Drizzle') {
        return this.backgroundImages.rain
      } else if (this.weatherCondition === 'Snow') {
        return this.backgroundImages.snow
      } else if (this.weatherCondition === 'Mist') {
        return this.backgroundImages.atmosphere
      } else if (this.weatherCondition === 'Thunderstorm') {
        return this.backgroundImages.thunder
      }
      return this.backgroundImages.default
    }
  },

  methods: {
    async getWeather (city) {
      try {
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

        const request = await fetch(`${baseURL}?q=${city}&appid=${openWeatherAPIKey}`, { mode: 'cors' })
        // console.log(request)

        if (request.status === 404) {
          this.isNotFound = true
          // console.log(this.isNotFound)
          return
        } else {
          this.isNotFound = false
        }

        if (!request.ok) {
          this.isUnknownError = true
          return
        } else {
          this.isUnknownError = false
        }

        const requestData = await request.json()

        // console.log(this.isNotFound)
        // console.log(requestData)

        this.currentWeather = {
          location: requestData.name,
          humidity: requestData.main.humidity,
          windSpeed: requestData.wind.speed,
          temperatureKelvin: requestData.main.temp,
          feelsLike: requestData.main.feels_like,
          timezoneShift: requestData.timezone,
          weatherDescription: requestData.weather[0],
          iconURL: `http://openweathermap.org/img/wn/${requestData.weather[0].icon}@2x.png`
        }

        // to change the background accordingly
        this.weatherCondition = requestData.weather[0].main

        // console.log(this.currentWeather)
        this.isWeatherCardShown = true
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  overflow-y: hidden;
  background: rgb(172,210,215);
  background: radial-gradient(circle, rgba(172,210,215,1) 53%, rgba(44,202,223,1) 80%);
}
#app {
  overflow: hidden;
}
#background-img {
  position: absolute;
  width: 100%;
}

/* Animations */
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in;
}
</style>
