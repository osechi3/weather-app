<template>
  <div id="app">
    <input v-model="city" type="text">
    <button type="button" @click="getWeather">Get Weather</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      city: 'California',
      currentWeather: {}
    }
  },

  methods: {
    async getWeather () {
      try {
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
        const APIKey = '4ef4b2a2a7bdeffc0eb01cf68ffe665e'

        const request = await fetch(`${baseURL}?q=${this.city}&appid=${APIKey}`, { mode: 'cors' })
        const requestData = await request.json()
        console.log(request)
        console.log(requestData)
        this.currentWeather = {
          location: requestData.name,
          humidity: requestData.main.humidity,
          windSpeed: requestData.wind.speed,
          temperatureKelvin: requestData.main.temp,
          feelsLike: requestData.main.feels_like, // Can I write it like this?
          timezoneShift: requestData.timezone
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
