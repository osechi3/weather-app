<template>
  <div id="app">
    <img id="background-img" :src="backgroundImg" alt="">
    <app-search-block @get-weather-btn-clicked="getWeather($event)"></app-search-block>
    <app-weather-card
      :currentWeather="currentWeather"
      v-if="Object.keys(currentWeather).length !== 0">
    </app-weather-card>
  </div>
</template>

<script>
import SearchBlock from './components/SearchBlock'
import WeatherCard from './components/WeatherCard'

export default {
  name: 'App',
  components: {
    appSearchBlock: SearchBlock,
    appWeatherCard: WeatherCard
  },

  data () {
    return {
      currentWeather: {},
      weatherCondition: '',
      backgroundImages: {
        default: 'https://giffiles.alphacoders.com/209/209343.gif',
        clear: 'https://thumbs.gfycat.com/FrankCleverGrebe-size_restricted.gif',
        rain: 'https://cdn.lowgif.com/full/0c035a373bb63aef-.gif',
        snow: 'https://thumbs.gfycat.com/FluidSnappyFox-size_restricted.gif',
        atmosphere: 'https://cdna.artstation.com/p/assets/images/images/010/644/324/original/daniel-riise-windy-hill.gif?1525465125',
        thunder: 'https://cdna.artstation.com/p/assets/images/images/017/663/258/original/anastasia-kozheko-thundery.gif?1556866811'
      }
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
      } else if (this.weatherCondition === 'Atmosphere') {
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
        const APIKey = '4ef4b2a2a7bdeffc0eb01cf68ffe665e'

        const request = await fetch(`${baseURL}?q=${city}&appid=${APIKey}`, { mode: 'cors' })
        const requestData = await request.json()
        console.log(request)
        console.log(requestData)

        this.currentWeather = {
          location: requestData.name,
          humidity: requestData.main.humidity,
          windSpeed: requestData.wind.speed,
          temperatureKelvin: requestData.main.temp,
          feelsLike: requestData.main.feels_like, // Can I write it like this?
          timezoneShift: requestData.timezone,
          weatherDescription: requestData.weather[0],
          iconURL: `http://openweathermap.org/img/wn/${requestData.weather[0].icon}@2x.png`
        }

        this.weatherCondition = requestData.weather[0].main
        console.log(this.currentWeather)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  overflow-y: hidden;
}
#app {
  overflow: hidden;
}
#background-img {
  position: absolute;
  width: 100%;
}
</style>
