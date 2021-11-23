<template>
  <div class="signup">
    <h1>Sign up</h1>
      <form class="form" @submit.prevent="createUser({email, password})">
      <input type="text" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <input
        type="password"
        placeholder="repeat password"
        v-model="repeatPassword"
      />

      <button type="submit" :disabled="!validingPassword">Register</button>
    </form>
    <p>{{error}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "Signup",

  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    ...mapActions(["createUser"]),
  },
  computed: {
    ...mapState(["user", "error"]),
    validingPassword() {
      return this.password === this.repeatPassword && this.password.trim() !== '' > 0 && this.password.length > 5;
    },
  },
};
</script>

<style>
button{
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
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.signup {
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

