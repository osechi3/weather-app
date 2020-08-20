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

    <!-- Error messages -->
    <p
      v-if="!$v.city.required && $v.city.$dirty && isClicked"
      class="error-msg">The search field must not be empty.
    </p>
    <p
      v-if="!$v.city.noSymbols && $v.city.$dirty && isClicked && $v.city.required"
      class="error-msg">The city can contain only letters of the english alphabet and germanic umlauts.
    </p>
    <p
      v-if="isNotFound && isClickedAsync"
      class="error-msg">The city was not found.
    </p>
    <p
      v-if="isUnknownError && isClickedAsync"
      class="error-msg">There was an unknown error.
    </p>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    isNotFound: Boolean,
    isUnknownError: Boolean
  },

  data () {
    return {
      city: 'California',
      isClicked: false,
      isClickedAsync: false,
      currentLocation: ''
    }
  },

  watch: {
    isNotFound () {
      this.showErrorMessageAsync()
    },
    isUnknownError () {
      this.showErrorMessageAsync()
    }
  },

  methods: {
    sendData () {
      if (this.validate()) {
        this.$emit('get-weather-btn-clicked', this.city)
        this.currentLocation = this.city
        this.city = ''
      } else if (!this.$v.noSameText) {
        this.city = ''
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
    },

    showErrorMessageAsync () {
      this.isClickedAsync = true
      setTimeout(() => {
        this.isClickedAsync = false
      }, 3700)
    }
  },

  validations: {
    city: {
      required,
      noSymbols: value => {
        const expression = /^[a-zA-ZäöüßÄÖÜ\s]+$/g
        return expression.test(value)
      },
      noSameText: (value, vm) => {
        return value !== vm.currentLocation
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
    z-index: 1;

    width: 655px;
    padding: 10px;

    color: white;
    font-size: 21px;

    background-color: #25283D;
  }
</style>
