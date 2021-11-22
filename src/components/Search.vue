<template>
  <div class="search">
    search: <input class="input" type="text" @keyup="sendChange" />
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["search"],
  data() {
    return {};
  },
  methods: {
    sendChange(event) {
      this.$emit("custom", event.target.value);
    },
  },
};
</script>

<style>
.input[type="text"] {
  transition: width 0.4s ease-in-out;
}

.input[type="text"]:focus {
  width: 100%;
}

.input[type="text"] {
  background-color: white;
  /* background-image: url('searchicon.png'); */
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 40px;
  border-radius: 5px;
}
</style>
