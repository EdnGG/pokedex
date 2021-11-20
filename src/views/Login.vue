<template>
  <div class="about">
    <h1>Login</h1>
   
      <form @submit.prevent="loginUser({email, password})">
      <input type="text" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <button 
        type="submit" 
        >
            Login
        </button>
    </form>
    <p>{{error}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
  },
  computed: {
    ...mapState(["user", "error"]),
    // validingInputs() {
    //   return this.email === '' && this.password.trim() !== '' > 0&& this.password.length > 5;
    // },
  },
};
</script>

