<template>
  <div id="container">
    <input
      id="input-field"
      v-model="city"
      type="text">
    <button
      id="btn-search"
      type="button"
      @click="$emit('get-weather-btn-clicked', city)">Search
    </button>
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
  #container {
    display: flex;
    justify-content: center;

    width: 800px;
    margin: 65px auto 0 auto;

    background-color: white;
    opacity: .8;
    border: 4px solid;
  }
  #input-field {
    width: 670px;
    padding-left: 10px;

    font-size: 30px;

    border: none;
  }
  #btn-search {
    width: 130px;
    height: 70px;

    font-size: 24px;
    color: white;
    font-weight: bold;

    border: none;
    background: #25283D;
  }
  #btn-search:hover {
    background-color: #E0E0E1;
    color: black;
  }
</style>
