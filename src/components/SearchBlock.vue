<template>
  <div id="container">
    <input v-model="city" type="text">
    <button type="button" @click="$emit('get-weather-btn-clicked', city)">Get Weather</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      city: 'California'
    }
  }
}
</script>
<style scoped>

</style>
