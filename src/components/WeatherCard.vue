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
        <p>{{ currentWeather.temperatureKelvin }}</p>
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
  }
}
</script>
<style scoped>

</style>
