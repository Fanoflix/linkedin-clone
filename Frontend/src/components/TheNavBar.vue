<template>
  <!-- Header -->
  <section id="nav">
    <!-- Link to Home + Logo  -->

    <div class="logo element">
      <!-- Logo takes to /home -->
      <router-link class="logo" to="/">
        <span class="svg">
          <transition
            name="hovered"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            mode="out-in"
          >
            <div key="1" v-if="$route.name != 'Home'">🔍💻</div>
            <div key="2" v-else style="transform: scale(1.32)">🔍💻</div>
          </transition>
        </span>
      </router-link>
    </div>

    <div class="nav-elements">
      <!-- If logged in -->
      <p class="element" v-if="isLoggedIn" style="color: red" @click="logout()">
        Logout
      </p>
      <router-link
        v-if="isLoggedIn"
        class="element"
        style="color: green"
        :to="`/profile/${user._id}`"
      >
        {{ user.name }}
      </router-link>
      <router-link v-if="isLoggedIn" class="element" to="/feed">
        Feed
      </router-link>

      <!-- If not logged in -->
      <router-link v-if="!isLoggedIn" class="element" to="/login">
        Log In
      </router-link>
      <router-link v-if="!isLoggedIn" class="element" to="/signup">
        Signup</router-link
      >

      <router-link class="element" to="/list"> List </router-link>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("setAuthData", {
        token: "",
        user: null,
        id: "",
        isAuth: false,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");

      console.log("Logging Out");
      this.$router.push("/");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    name() {
      if (this.isLoggedIn) {
        return this.$store.getters.user.name;
      } else {
        return "";
      }
    },
    user() {
      if (this.isLoggedIn) {
        return this.$store.getters.user;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  display: flex;
  background-color: rgb(0, 0, 0);
  width: 100%;
  flex-direction: row;
  max-width: none;
  height: 50px;
  justify-content: center;
  align-items: center;
  user-select: none;

  &.logo {
    width: 100px;
    height: 100%;
    overflow: visible;
    will-change: transform;
    white-space: nowrap;
    border-bottom: transparent !important;
    text-align: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    vertical-align: center;
    width: 100px;
    text-decoration: none !important;
  }

  .nav-elements {
    display: flex;
    flex-direction: row-reverse;
    max-width: none;
    width: 70%;
    align-items: center;
    // margin: 0 auto;
  }

  .element {
    cursor: pointer;
    text-decoration: none;
    margin: 0 20px;
    font-weight: bold;
    color: #ffffff;
    height: 50px;
    border-bottom: rgb(0, 0, 0) 2px solid inset;
    text-decoration: none;
    display: flex;
    will-change: border;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 120px;
    transition: all 0.15s linear;

    &.router-link-exact-active {
      transition: border 0.15s linear;
      border-bottom: solid 4px rgb(0, 255, 106);

      &.logo {
        border-bottom: none;
      }
    }
  }
}
</style>
