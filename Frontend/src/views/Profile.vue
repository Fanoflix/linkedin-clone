<template>
  <section class="container">
    <h1 class="margin-bot name">{{ name }}</h1>

    <p class="margin-bot connections">{{ connections }} connection(s)</p>

    <p class="divider">___________________</p>

    <p class="margin-bot bio">{{ bio }}</p>

    <p class="divider">___________________</p>
    <div class="margin-bot resume">
      {{ name }}'s Portfolio: <span class="fileColor">Resume.pdf</span>
    </div>

    <!-- Add Update Bio -->
    <br />
    <p class="connections">Add or Edit Bio</p>
    <form @submit.prevent="addBio()">
      <input type="text" v-model="newBio" />
      <button>Add</button>
    </form>

    <!-- Connect to user -->
    <br />
    <p class="connections">Connect to this user!</p>
    <button class="connectBtn" @click.prevent="connectUser()">Connect</button>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      newBio: "",
      bio: "",
      skills: "",
      name: "",
      connections: 0,
      connectionsList: {},
      isEligible: false,
    };
  },

  mounted() {
    console.log(this.$store.getters.isAuth);
    console.log(this.$route.params.userId);
    console.log("logged in");
    this.getUser();
  },
  methods: {
    isEligibleForConnection() {
      // if logged in
      // ---- if id in store not equal to dynamically received id
      // -------- display connect button (isEligible == true)
    },
    connectUser() {

    },
    getUser() {
      axios
        .get(`http://localhost:3000/users/getUser/${this.paramUserId}`)
        .then((res) => {
          this.connections = res.data.user.connections.length;
          this.bio = res.data.user.bio;
          this.name = res.data.user.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBio() {
      axios
        .get("http://localhost:3000/users/getBio", {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.bio = res.data.bio;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addBio() {
      axios
        .put(
          "http://localhost:3000/users/addBio",
          {
            bio: this.newBio,
          },
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          this.getBio();
        });

      this.newBio = "";
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    token() {
      return this.$store.getters.authToken;
    },
    paramUserId() {
      return this.$route.params.userId;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  font-family: "Montserrat", sans-serif;
  padding: 40px;

  font-weight: 600;
  font-size: 50px;

  text-align: left;
  width: 700px;
  height: 600px;
  margin: 30px auto;

  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.076);
  .divider {
    margin-top: -20px;
    font-size: 40%;
    color: rgba(0, 0, 0, 0.302);
  }
  .margin-bot {
    margin-bottom: 15px;
  }
  .name {
    font-size: 70%;
  }

  .connections {
    color: rgb(112, 112, 112);
    font-size: 35%;
    margin-top: -10px;
  }

  .bio {
    margin-bottom: 40px;
    font-size: 35%;
  }

  .resume {
    font-size: 30%;
    font-weight: 600;
    color: rgb(58, 58, 58);

    .fileColor {
      font-size: 100%;
      font-weight: 400;
      color: rgb(0, 0, 0);
    }
  }
  input {
    padding: 10px;
  }
  button {
    margin-left: 5px;
    height: 49px;
    width: 80px;

    &.connectBtn {
      margin-left: 0;
      width: 409px;
    }
  }
}
</style>
