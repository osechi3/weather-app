<template>
  <div>
    <div id="container">
      <input
        id="input-field"
        v-model="city"
        type="text"
        placeholder="Enter the city">
      <button
        id="btn-search"
        type="button"
        @click="sendData">Search
      </button>
    </div>
    <p
      v-if="!$v.city.required && $v.city.$dirty && isClicked"
      class="error-msg">The search field must not be empty.
    </p>
    <p
      v-if="!$v.city.noSymbols && $v.city.$dirty && isClicked && $v.city.required"
      class="error-msg">The city can contain only letters.
    </p>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      city: 'California',
      isClicked: false
    }
  },

  methods: {
    sendData () {
      if (this.validate()) {
        this.$emit('get-weather-btn-clicked', this.city)
      } else {
        this.showErrorMessage()
      }
    },

    validate () {
      this.$v.$touch()
      return !this.$v.$invalid
    },

    showErrorMessage () {
      this.isClicked = true
      setTimeout(() => {
        this.isClicked = false
      }, 3700)
    }
  },

  validations: {
    city: {
      required,
      noSymbols: value => {
        const expression = /^[a-zA-ZäöüßÄÖÜ\s]+$/g
        return expression.test(value)
      }
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

  .error-msg {
    position: absolute;
    top: 121px;
    left: 360px;

    width: 655px;
    padding: 10px;

    color: white;
    font-size: 21px;

    background-color: #25283D;
  }
</style>
