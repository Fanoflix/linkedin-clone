<template>
  <section class="container">
    Profile
    <!-- Connect to user -->
    <button
      class="margin-bot connectBtn"
      v-if="isEligibleForConnect"
      @click.prevent="connectUser()"
    >
      Connect to this user
    </button>
    <br /><br />
    <p class="margin-top divider">
      ___________________________________________________
    </p>
    <h1 class="margin-bot name">{{ name }}</h1>

    <p class="margin-bot2 margin-top connections">
      {{ connections }} connection(s)
    </p>

    <p
      class="margin-bot bio empty"
      v-if="bio == '' && isEligibleForEdit"
      style="color: gray; font-size: 15px"
    >
      Describe yourself!
    </p>
    <p
      class="margin-bot bio empty"
      v-else-if="bio == '' && !isEligibleForEdit"
      style="color: gray; font-size: 15px"
    >
      {{name}} has not added any bio.
    </p>
    <p class="margin-bot bio" v-else>{{ bio }}</p>

    <!-- Add/Update Bio -->
    <section v-if="isEligibleForEdit">
      <p class="margin-bot margin-top connections">Add or Edit Bio</p>
      <form @submit.prevent="addBio()">
        <input type="text" v-model="newBio" />
        <button class="margin-bot2">Add</button>
      </form>
    </section>

    <!-- RESUME  -->
    <section v-if="isEligibleForEdit">
      <p class="margin-bot margin-top connections">Upload Your Resume</p>
      <form @submit.prevent="uploadResume()" enctype="multipart/form-data">
        <input
          class="custom-file-input"
          type="file"
          ref="file"
          @change="onFileChange(e)"
        />
        <!-- <button class="margin-bot2">Add</button> -->
      </form>
    </section>

    <a
      v-if="resumeUrl !== ''"
      target="_blank"
      :href="resumeUrl"
      class="margin-bot2 connections"
      style="cursor: pointer; color: blue; width: 120px; display: inline"
    >
      Download Resume
    </a>
    <div v-else class="margin-bot2 resume">
      {{ name }} hasn't uploaded his resume.<span class="fileColor">{{
        fileName
      }}</span>
    </div>

    <!-- SKILLS  -->
    <p class="margin-top2">Skills</p>
    <p class="margin-top divider">
      ___________________________________________________
    </p>
    <p
      style="display: inline"
      v-for="skill in skills"
      :key="skill._id"
      class="skill"
    >
      <skill
        style="display: inline"
        @refresh-skills="refreshSkills"
        :isAuth="isLoggedIn"
        :targetUser="profileId"
        :name="skill.name"
        :endorsements="skill.endorsements"
        :id="skill._id"
      />
    </p>
    <!-- Add Skills -->
    <section class="margin-top2" v-if="isEligibleForEdit">
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
import Skill from "../components/Skill.vue";

export default {
  name: "Profile",
  components: {
    Skill,
  },
  data() {
    return {
      newBio: "",
      newSkill: "",
      bio: "",
      skills: "",
      name: "",
      resumeUrl: "",
      connections: 0,
      fileName: "",
      connectionsList: {},
      isEligibleForConnect: false,
      isEligibleForEdit: false,
    };
  },
  mounted() {
    this.getUser();
    this.checkEligibility();
  },
  methods: {
    onFileChange() {
      const selectedFile = this.$refs.file.files[0]; // accessing file
      this.selectedFile = selectedFile;
      this.fileName = selectedFile.name;
      this.uploadFile();
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("documents", this.selectedFile); // appending file

      axios
        .post("http://localhost:3000/users/uploadResume", formData, {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        })
        .then(() => {
          this.getUser();
        });
    },
    refreshSkills() {
      this.getSkills();
    },
    checkEligibility() {
      if (this.isLoggedIn) {
        if (this.authorizedId !== this.profileId) {
          // cannot change bio BUT can connect
          this.isEligibleForConnect = true;
          this.isEligibleForEdit = false;
        } else {
          // can change bio BUT cannot connect
          this.isEligibleForConnect = false;
          console.log("status: logged in");
          this.isEligibleForEdit = true;
        }
      }
    },
    connectUser() {
      // Connect profileId to authorizedId
      axios
        .put(
          "http://localhost:3000/users/connect",
          {
            connectId: this.profileId,
          },
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addSkill() {
      axios
        .put(
          "http://localhost:3000/users/addSkill",
          {
            name: this.newSkill,
            endorsements: 0,
          },
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          this.getSkills();
        });

      this.newSkill = "";
    },
    getUser() {
      axios
        .get(`http://localhost:3000/users/getUser/${this.profileId}`)
        .then((res) => {
          this.connections = res.data.user.connections.length;
          this.bio = res.data.user.bio;
          this.name = res.data.user.name;
          this.skills = res.data.user.skills;
          console.log(res.data.user);
          this.resumeUrl = "http://localhost:3000/" + res.data.user.resumeUrl;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSkills() {
      axios
        .get(`http://localhost:3000/users/getSkills/${this.profileId}`, {})
        .then((res) => {
          this.skills = res.data.skills;
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
  width: 1000px;
  height: 800px;
  margin: 30px auto;

  color: rgb(169, 169, 169);

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
  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content: "Click here to upload your Resume.";
  }
  .custom-file-input {
    border: none;
    margin-right: 5px;
    text-shadow: 0px 0px 2px rgb(0, 60, 32);
    cursor: pointer;
    height: 40px;
  }
  .name {
    color: black;
    font-size: 110%;
    font-variant: small-caps;
    margin-bottom: 10px;
  }

  .connections {
    font-size: 32%;
  }

  .bio {
    margin-bottom: 40px;
    color: black;
    font-size: 45%;
    &.empty {
      font-style: italic;
    }
  }
  .skill {
    // border: 1px solid rgb(165, 165, 165);
    box-shadow: 2px 2px 5px rgb(189, 189, 189);
    color: rgb(55, 55, 55);
    border-radius: 4px;
    width: 120px;
    margin: 4px;
    font-size: 30%;
    padding: 7px;
    cursor: pointer;
  }
  .resume {
    font-size: 35%;
    font-weight: 400;
    color: rgb(0, 0, 0);

    .fileColor {
      font-size: 120%;
      font-weight: 600;
      color: rgb(255, 0, 0);
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
