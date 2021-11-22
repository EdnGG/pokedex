<template>
  <div class="container home">
    <div class="nav">
    <h1>Welcome: {{ user.user }}</h1>
    <button @click="logoutUser">Sign Out</button>

    </div>
    <div class="search">
      
    <Search @custom="receiveChange" />
    </div>
    <div class="cards">
      <Card
        v-for="pokemon in filterByName"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from "vuex";
import Card from "../components/Card.vue";
import Search from "../components/Search.vue";

export default {
  components: {
    Card,
    Search,
  },

  name: "Home",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState(["user", "pokemons", "urlId"]),
    ...mapGetters(["userIsActive"]),
    filterByName() {
      return this.pokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    receiveChange(event) {
      this.search = event;
    },
    ...mapActions(["logoutUser", "getPockemons"]),
    async getImage(pokemonImg) {
      const res = await fetch(pokemonImg);
      const data = await res.json();

      console.log(data.sprites.front_default);
      this.image = data.sprites.front_default;
      console.log("image: ", this.image);
      return this.image;
    },
  },
  created() {
    this.getPockemons();
  },
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 10px;
}
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #eaedf0;
  color: #fff;

  padding: 30px;
}
button {
  background: #147cdd;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
}
.cards {
  display: flex;
  flex-wrap: wrap;
}
.cards > * {
  flex: 1 1 300px;
  margin: 2rem;
}
</style>
