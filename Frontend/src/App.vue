<template>
  <section>
    <the-nav-bar />
    <router-view></router-view>
  </section>
</template>

<script>
import TheNavBar from "./components/TheNavBar.vue";
export default {
  name: "App",
  components: { TheNavBar },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand&family=Rubik:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto+Slab:wght@500&display=swap");


* {
  // Custom Scrollbar
  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #a3a3a3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(43, 43, 43);
  }
}
body {
  margin: 0px 0px;
  padding: 0px 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
input {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: black;
  &::placeholder {
    font-weight: 400;
  }
  height: 25px;
  width: 300px;
  margin: 5px;
  padding: 10px;
  border: 2px solid;
}

button {
  font-weight: 600;
  height: 50px;
  width: 323px;
  border: 2px solid black;
  background-color: black;
  color: white;

  &:hover {
    background-color: rgb(22, 0, 0);
    color: rgb(255, 255, 255);
  }
  &:active {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  }
}
</style>
