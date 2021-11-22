<template>
  <div class="container">
    <div class="card">
      <img :src="imagePokemon" :alt="pokemon.name" style="width: 25%" />
      <div class="details">
        <h4>
          <b>{{ pokemon.name }}</b>
        </h4>
        <p>Type: {{ types[0]}}</p>
      </div>
      <div v-if="openStats" class="details">
        <h4>
          <b>Weight: {{ weight }}</b><br>
          <b>Size: {{ size }}</b>
        </h4>
      </div>
      <div>
        <button @click="openStatss">Details</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Card",
  props: ["pokemon"],
  data() {
    return {
      openStats: false,
      showModal: false,
      imagePokemon: "",
      types: "",

      species: "",
      weight: "",
      size: "",
      abilities: "",
      // gender: ""
    };
  },
  computed: {
    ...mapState(["user", "pokemons", "urlId"]),
    ...mapGetters(["userIsActive"]),
  },
  methods: {
    ...mapActions(["logoutUser", "getPockemons"]),
    openStatss() {
      this.openStats = !this.openStats;
    },
    getImage() {
      axios
        .get(this.pokemon.url)
        .then((res) => {
          this.imagePokemon = res.data.sprites.front_default;
          this.species = res.data.species.name;
          this.weight = res.data.weight;
          this.size = res.data.height;
          this.abilities = res.data.abilities;
          // this.gender = res.data.gender
          this.types = res.data.types.map((type) => {
            return type.type.name;
          });
          // console.log("types: ", this.types);
        })
        .catch((err) => reject(err));
    },
  },
  created() {},
  mounted() {
    this.getImage();
  },
};
</script>


<style scoped>
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}
button {
  background: #11d632;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10%;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
}

img {
  border-radius: 5px 5px 0 0;
}
</style>