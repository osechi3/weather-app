<template>
  <div id="app">
    <app-search-block @get-weather-btn-clicked="getWeather($event)"></app-search-block>
  </div>
</template>

<script>
import SearchBlock from './components/SearchBlock'

export default {
  name: 'App',
  components: {
    appSearchBlock: SearchBlock
  },

  data () {
    return {
      currentWeather: {}
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
          weatherDescription: requestData.weather[0]
        }
        console.log(this.currentWeather)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
