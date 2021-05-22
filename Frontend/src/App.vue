<template>
  <section>
    <the-nav-bar/>
      
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/login">Log In</router-link>
    <router-link to="/post">Post</router-link>
    <router-view></router-view>
  </section>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';
export default {
  name: "App",
  components: {TheNavBar},
};
</script>

<style>

@import url("https://fonts.googleapis.com/css2?family=Quicksand&family=Rubik:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto+Slab:wght@500&display=swap');

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
</style>
