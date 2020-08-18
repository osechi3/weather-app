<template>
  <div id="container">
    <div id="header">
      <h1>{{ currentWeather.location }}</h1>
    </div>
    <div id="body">
      <div>
        <img :src="currentWeather.iconURL" alt="">
        <p>{{ currentWeather.weatherDescription.main }}</p>
      </div>
      <div>
        <p>{{ temperatureCelsius }} {{ temperatureFahrenheit }}</p>
        <button>C</button>
        <button>F</button>
      </div>
      <p>Feels like: {{ currentWeather.feelsLike }}</p>
      <div>
        <p>Humidity: {{ currentWeather.humidity }}</p>
        <p>Wind: {{ currentWeather.windSpeed }}</p>
      </div>
      <p>Time: {{ currentWeather.timezoneShift }}</p>
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

</style>
