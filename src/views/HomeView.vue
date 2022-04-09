<template>
  <div class="home">
    <HomePage/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HomePage
  },
  mounted() {
    axios
      .get('http://localhost:8088/api/asset')
      .then(res => console.log(res));
  }
}
</script>
