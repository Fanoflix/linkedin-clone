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
            <img key="1" v-if="$route.name != 'Home'" alt="-A-logo" />
            <img key="2" v-else style="transform: scale(1.32)" alt="-A-logo" />
          </transition>
        </span>
      </router-link>
    </div>

    <div class="nav-elements">
      <!-- If not logged in -->
      <router-link to="/login"> Log In </router-link>

      <!-- If logged in -->
      <router-link to="/contact"> OR Name </router-link>
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
    border-bottom: rgb(15, 15, 15) 2px solid;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 100px;
    height: 100px;
    transition: border 0.2s linear;

    &:hover {
      border-bottom: rgb(75, 75, 75) 2px solid;
      transition: border 0.2s linear;

      &.logo {
        background-color: rgb(15, 15, 15);
        border-bottom: none !important;
      }
    }
    &.router-link-exact-active {
      transition: border 0.2s linear;
      border-bottom: white 2px solid !important;

      &.logo {
        border-bottom: none !important;
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
