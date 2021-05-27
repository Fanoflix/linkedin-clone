<template>
  <section>
    List of Registered Users - Click to view profile
    <span v-for="user in users" :key="user._id">
      <p @click="goToProfile(user._id)">{{ user.name }}</p>
      <p class="divide">
        _____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
      </p>
    </span>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: null,
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      axios.get("http://localhost:3000/users").then((res) => {
        this.users = res.data.users;
      });
    },
    goToProfile(urlExtension) {
      this.$router.push(`/profile/${urlExtension}`);
    },
  },
  computed: {
    token() {
      return this.$store.getters.authToken;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  font-family: "Montserrat", sans-serif;
  margin: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  .divide {
    font-size: 10%;
  }
  span {
    p {
      font-weight: 400;
      font-size: 60%;
      color: rgb(0, 0, 0);
      list-style-type: none;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
}
</style>
