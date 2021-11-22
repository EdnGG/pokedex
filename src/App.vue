<template>
  <div id="app">

    <div id="nav">
      <!-- <router-link to="/" v-if="userIsActive">Home</router-link>  -->
      <router-link to="/signup" v-if="!userIsActive">Sign up</router-link> 
      <router-link to="/login" v-if="!userIsActive">Login</router-link> 
    </div>

    

    <router-view/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'App',
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

<style>

/*  */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #147cdd;
  color: #fff;

  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
