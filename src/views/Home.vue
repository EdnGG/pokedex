<template>
  <div class="home">
  <button @click="logoutUser">Sign Out</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{user.email}}</h1>
    <!-- <h2>Home screen showing the first 150 Pokemons with image, name, and types. +10</h2> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
    data() {
      return{
        // user: {}
      }
    },
    computed:{
      ...mapState(["user"]),
      ...mapGetters(["userIsActive"])
    },
    methods:{
      ...mapActions(["logoutUser"]),
    },
}

</script>
