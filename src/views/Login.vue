<template>
  <div class="login">
    <h1>Login</h1>
   
      <form class="form" @submit.prevent="loginUser({email, password})">
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
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
  },
  computed: {
    ...mapState(["user", "error"]),
  },
};
</script>

<style>
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login {
  width: 70%;
  max-width: 500px;
  margin: 50px auto;
  padding: 50px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

