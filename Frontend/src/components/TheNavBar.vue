<template>
  <!-- Header -->
  <section id="nav">
    <!-- Link to Home + Logo  -->

    <div class="logo">
      <!-- Logo takes to /home -->
      <router-link class="logo" to="/">
        <span class="svg">
          <transition
            name="hovered"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            mode="out-in"
          >
            <img key="1" v-if="$route.name != 'Home'" alt="logo" />
            <img key="2" v-else style="transform: scale(1.32)" alt="-A-logo" />
          </transition>
        </span>
      </router-link>
    </div>

    <div class="nav-elements">
      <!-- If not logged in -->
      <router-link to="/login"> Log In </router-link>
      <router-link to="/signup"> Signup </router-link>

      <!-- If logged in -->
      <!-- <router-link to="/profile"> if LI Name </router-link> -->
      <router-link to="/feed"> My Feed </router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#nav {
  font-family: "Montserrat", sans-serif;
  display: flex;
  background-color: rgb(0, 0, 0);
  width: 100%;
  flex-direction: row;
  max-width: none;
  height: 100px;
  justify-content: center;
  align-items: center;
  user-select: none;

  .logo {
    margin-left: 8%;
    width: 100px;
    height: 100%;
    overflow: visible;
    will-change: transform;
    white-space: nowrap;
    border-bottom: transparent !important;
    text-align: center;
  }

  a {
    font-weight: bold;
    color: #ffffff;
    border-bottom: rgb(0, 0, 0) 6px solid inset;
    text-decoration: none;
    display: flex;
    will-change: border;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 100px;
    height: 100px;
    transition: all 0.15s linear;

    &.router-link-exact-active {
      transition: border 0.15s linear;
      border-bottom: white 6px solid;

      &.logo {
        border-bottom: none;
      }
    }
  }

  .nav-elements {
    display: flex;
    flex-direction: row-reverse;
    max-width: none;
    width: 80%;
    align-items: center;
    margin-right: 8%;
  }
}
</style>
