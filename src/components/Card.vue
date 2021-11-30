<template>
  <div class="container">
    <div class="card--flex">
      <img :src="imagePokemon" :alt="pokemon.name" style="width: 80%" />
      <div class="details">
        <h4>
          <b>{{ pokemon.name }}</b>
        </h4>
        <!-- iterar types -->
        <p>Type: {{ allTypes }}</p>
      </div>
      <div v-if="openStats" class="details"></div>
      <div>
        <button @click="showStats">Details</button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <p>Weight: {{ weight }}</p>
        <p>Size: {{ size }}</p>
        <p>Abilities: {{ ability }}</p>
      </div>
    </div>
    <!-- Ends Modal -->
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
      types: [],
      allTypes: "",
      allAbilities: "",
      species: "",
      weight: "",
      size: "",
      abilities: "", // Arreglo de objetos
      ability: "",
      // gender: ""
    };
  },
  computed: {
    ...mapState(["user", "pokemons", "urlId"]),
    ...mapGetters(["userIsActive"]),
  },
  methods: {
    ...mapActions(["logoutUser", "getPockemons"]),
    getTypes() {
      this.types.map((el) => {
        if (el.length > 0) {
          return (this.allTypes += `${el}, `);
        } else {
          return (this.allTypes += `${el}`);
        }
      });
    },
    getAbilyties() {
      // this.abilities.map((el) => {
      //   return el.ability.name
      //   if (el.length > 0) {
      //     return (this.allAbilities += `${el}, `);
      //   } else {
      //     return (this.allAbilities += `${el}`);
      //   }
      // });
     
      let habilidades = [];
      for (let element in this.abilities) {
        habilidades.push(this.abilities[element].ability.name.split("-")[0]);
      }
      return (this.ability = habilidades);
    },
    closeModal() {
      this.showModal = false;
    },
    showStats() {
      // this.openStats = !this.openStats;
      this.showModal = !this.showModal;
    },
    getImage() {
      axios
        .get(this.pokemon.url)
        .then((res) => {
          // console.log('pokemon.url: ', this.pokemon.url);
          this.imagePokemon = res.data.sprites.front_default;
          this.species = res.data.species.name;
          this.weight = res.data.weight;
          this.size = res.data.height;
          this.abilities = res.data.abilities;
          // this.gender = res.data.gender
          this.types = res.data.types.map((type) => {
            return type.type.name;
          });
        })
        .catch((err) => console.log('Error: ', err));
    },
  },
  mounted() {
    // this.getImage();
    // this.getAbilyties();
  },
  created() {
    this.getImage()
    // this.getAbilyties();
  },
  beforeMount() {
    // this.getAbilyties();
  },
  beforeUpdate() {
    this.getAbilyties();
    this.getTypes();

    // this.getImage();
  },
  updated() {
    // this.getAbilyties();
    // this.getTypes();

    // this.getImage();
  },
};
</script>

<style scoped>
/* Modal Styles */

/* The Modal (background) */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  /* display: none; Hidden by default */
  /* Stay in place */
  position: fixed;
  /* Sit on top */
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  /* overflow: auto; Enable scroll if needed */
  background-color: rgb(143, 197, 188); /* Fallback color */
  background-color: rgba(201, 241, 231, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #c4f0f8;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Ends Modal Styles */
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
  border-radius: 1rem;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10%;
}

.container {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: center;
  padding: 40px;
  margin: 40px;
  border-radius: 1rem;
}
.card-grid {
  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-gap: 2rem;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
}

.card--flex {
  /* display: grid;
  grid-template-columns: minmax(300px, 1fr); 
  grid-gap: 2rem; */
  padding: 50px;
  margin: 20px;
  width: 100%;
  overflow: hidden;
  text-align: center;
  /* justify-content: center; */
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 1rem;
}
/* .card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
} */

img {
  border-radius: 5px 5px 0 0;
}
</style>