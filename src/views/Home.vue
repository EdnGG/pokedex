<template>
  <div>
    <div class="container home">
      <div class="search">
        <Search @custom="receiveChange" />
      </div>


      <!-- <div class="cards"> -->
      <div class="cards" v-if="showNextPokemons">
        <Card
          v-for="pokemon in filterByName"
          :key="pokemon.name"
          :pokemon="pokemon"
        />
      </div>

      <div class="cards" v-else>
        <Card
          v-for="pokemon in filterByNamePokes"
          :key="pokemon.name"
          :pokemon="pokemon"
        />
      </div>

      <div class="footer">
        <div class="footer--buttons">
          <button @click="prev">Prev</button>
          {{ nextPage}}
          <button @click="getNextPage()">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";

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
      showNextPokemons: true,
      allPokes: [],
      search: "",
      nextPage: "",
      prevPage: "",
    };
  },
  computed: {
    ...mapState(["user", "pokemons", "urlId", "next"]),
    ...mapGetters(["userIsActive"]),

    filterByName() {
      return this.pokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    filterByNamePokes() {
      return this.allPokes.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    ...mapActions(["logoutUser", "getPockemons"]),
    async getNextPage() {
      try {
        this.showNextPokemons = false;
      // this.nextPage llega como undefined
      console.log('this.nextPage antes de axios: ', this.nextPage);
       await axios.get(this.next).then((response) => {

        // console.log("response: ", response);
        // const res = response.data.results;
        // console.log('response.data: ', response.data)
        // this.nextPage = ''
        const res = response.data.next;
        this.nextPage = res 
        console.log('this.nextPage dentro de axios: ', this.nextPage);
        // console.log('this.nextPage dentro de axios:', this.nextPage);
        // this.allPokes = this.allPokes.concat(res);
        this.allPokes.push(response.data.results);
      });
      console.log('this.nextPage despues de axios: ', this.nextPage);
        
      } catch (error) {
        console.log('Error: ', error);
      }
      
      

    },
    prev() {},
    receiveChange(event) {
      this.search = event;
    },
  },
  created() {
    this.getPockemons();
    // console.log('this.nextPage from created hook: ', this.nextPage);
  },
  beforeUpdate() {
    // necesito actualizar el valor de this.nextPage
    // this.nextPage = this.next;
    // console.log("this.nextPage from beforeUpdate: ", this.nextPage);
  },
  updated() {
    console.log("this.nextPage from updated: ", this.nextPage);
    // this.showNextPokemons = true;
  },
};
</script>

<style scoped>
.footer {
  margin-bottom: 30px;
  margin-top: 30px;
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer--buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
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
  padding: 40px;
  margin: 40px;
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
