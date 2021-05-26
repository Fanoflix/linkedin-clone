<template>
  <section class="container">
    Profile
    <!-- Connect to user -->
    <button class="margin-bot connectBtn" v-if="isEligibleForConnect" @click.prevent="connectUser()">
      Connect to this user
    </button>
    <br /><br>
    <p class="margin-top divider">___________________________________________________</p>
    <h1 class="margin-bot name">{{ name }}</h1>

    <p class="margin-bot2 margin-top connections">
      {{ connections }} connection(s)
    </p>


    <p
      class="margin-bot bio"
      v-if="bio == ''"
      style="color: gray; font-size: 15px"
    >
      Describe yourself!
    </p>
    <p class="margin-bot bio" v-else>{{ bio }}</p>

    <!-- Add/Update Bio -->
    <p class="margin-bot margin-top connections">Add or Edit Bio</p>
    <form @submit.prevent="addBio()">
      <input type="text" v-model="newBio" />
      <button class="margin-bot2" >Add</button>
    </form>


    <div class="margin-bot2 resume">
      {{ name }}'s Portfolio: <span class="fileColor">Resume.pdf</span>
    </div>

    <!-- SKILLS  -->
    <p class="margin-top2">Skills</p>
    <p class="margin-top divider">___________________________________________________</p>
    <p class="bio">Python &nbsp; | &nbsp; C++</p>
    <!-- Add Skills -->
    <section v-if="isEligibleForEdit">
      <p class="margin-bot connections">Add Skill</p>
      <form @submit.prevent="addSkill()">
        <input type="text" v-model="newSkill" />
        <button>Add</button>
      </form>
    </section>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      newBio: "",
      newSkill: "",
      bio: "",
      skills: "",
      name: "",
      connections: 0,
      connectionsList: {},
      isEligibleForConnect: false,
      isEligibleForEdit: false,
    };
  },

  mounted() {
    console.log("logged in");
    this.getUser();
    this.checkEligibility();
  },
  methods: {
    checkEligibility() {
      // if logged in
      // ---- if id in store IS NOT EQUAL to dynamically received id
      // -------- display connect button (isEligibleForConnect == true)
      if (this.isLoggedIn) {
        if (this.authorizedId !== this.profileId) {
          // cannot change bio + can connect
          this.isEligibleForConnect = true;
          this.isEligibleForEdit = false;
        } else {
          // can change bio + cannot connect
          this.isEligibleForConnect = false;
          this.isEligibleForEdit = true;
        }
      }
    },
    connectUser() {},
    getUser() {
      axios
        .get(`http://localhost:3000/users/getUser/${this.profileId}`)
        .then((res) => {
          this.connections = res.data.user.connections.length;
          console.log(this.connections);
          this.bio = res.data.user.bio;
          this.name = res.data.user.name;
          this.skills = res.data.user.skills;
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
    profileId() {
      return this.$route.params.userId;
    },
    authorizedId() {
      return this.$store.getters.authId;
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
  font-size: 40px;

  text-align: left;
  width: 700px;
  height: 800px;
  margin: 30px auto;

  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.076);
  .divider {
    margin-top: 5px;
    font-size: 40%;
    color: rgba(0, 0, 0, 0.302);
  }
  .margin-bot {
    margin-bottom: -10px;
  }
  .margin-bot2 {
    margin-bottom: 20px;
  }
  .margin-top2 {
    margin-top: 20px;
  }
  .margin-top {
    margin-top: -10px;
  }

  .name {
    font-size: 70%;
    margin-bottom: 10px;
  }

  .connections {
    color: rgb(112, 112, 112);
    font-size: 30%;
    // margin-top: 10px;
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
    height: 15px;
    padding: 10px;
  }
  button {
    margin-left: 5px;
    height: 39px;
    width: 80px;
    &.connectBtn {
      margin-left: 0;
      width: 200px;
      height: 60px;
    }
  }
}
</style>
