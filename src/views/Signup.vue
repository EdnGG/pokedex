<template>
  <div class="about">
    <h1>Sign up</h1>
    <!-- <h2>
      Bookmark Pokemons and store them locally in Vuex (requires login). +10
    </h2> -->
      <form @submit.prevent="createUser({email, password})">
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
    };
  },
  methods: {
    ...mapActions(["createUser"]),
  },
  computed: {
    ...mapState(["user", "error"]),
    validingPassword() {
      return this.password === this.repeatPassword && this.password.trim() !== '' > 0&& this.password.length > 5;
    },
  },
};
</script>

