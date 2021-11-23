<template>
  <div id="app">
    <div id="nav">
      <router-link to="/signup" v-if="!userIsActive">
        <button>Sign up</button>
      </router-link>
      <router-link to="/login" v-if="!userIsActive">
        <button>Login</button>
      </router-link>
      <div v-if="userIsActive">
      <div class="title--name__user">
        <h1>User:  </h1>
        <h4>{{ user.user }}</h4>
      </div>
      <button 
        @click="logoutUser"
      >Sign Out</button>
      </div>
    
    </div>
    <div v-if="!userIsActive" class="img--container">
      <img class="img--pockemon" src="../public/pockedex.png" alt="Pockemon" />
    </div>
    

    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      // user: {}
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["userIsActive"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
  },
};
</script>

<style>
.title--name__user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-top: 100px; */
  /* padding-bottom: 100px; */
}
button {
  background: #e78585;
  border-radius: 1rem;
  color: #fff;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 10px;
  cursor: pointer;
}
/*  */
.img--pockemon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  height: 40%;
}
.image--container {
  /* width: 20px;
  height: 20px; */
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

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
  /* background: #147cdd; */
  /* color: #fff; */
  padding: 30px;
  margin-bottom: 50px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
