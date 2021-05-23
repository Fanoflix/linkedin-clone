<template>
  <section>
    <div class="panel">
      <div class="detail">LinkedOut Account Login</div>
    </div>
    <div class="content">
      <h1 class="title">LinkedOut</h1>

      <h2>Log In</h2>
      <p style="margin-top: -10px; margin-bottom: 40px">
        Fill in your Account Information.
      </p>

      <!-- Form -->
      <form @submit.prevent="onSubmit()" class="inputs">
        Email <br />
        <input type="text" v-model="email" placeholder="Email" /><br />
        Password <br />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
        /><br /><br />
        <p
          style="color: red; font-weight: 600; font-size: 15px"
          v-show="emailError || passError"
          v-for="error in errorMessages"
          :key="error"
          class="error"
        >
          {{ error }}
        </p>

        <button>Login</button>
      </form>

      <p>
        Don't have an account?
        <router-link class="note" to="/signup">Signup</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      emailErrorMessage: "User not found.",
      passErrorMessage: "Incorrect Password.",
      errorMessages: [],
      emailError: false,
      passError: false,
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("http://localhost:3000/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {})
        .catch((err) => {
          if (err.response.status == 404) {
            console.log("Wrong Email");
            this.emailError = true;
            if (!this.errorMessages.includes(this.emailErrorMessage)) {
              this.errorMessages.push(this.emailErrorMessage);
            }
            return;
          } else if (err.response.status == 401) {
            console.log("Wrong Password");
            this.passError = true;
            if (!this.errorMessages.includes(this.passErrorMessage)) {
              this.errorMessages.push(this.passErrorMessage);
            }
            return;
          }
        });

      this.password = ''
      this.passwordCheck = ''
    },
  },
  watch: {
    email(newVal, oldVal) {
      if (newVal != oldVal) {
        this.emailError = false;
        this.errorMessages = this.errorMessages.filter(
          (item) => item !== this.emailErrorMessage
        );
      }
    },
    password(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.passError = false;
        this.errorMessages = this.errorMessages.filter(
          (item) => item !== this.passErrorMessage
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100vw;
  height: 80vh;
  display: flex;
  font-family: "Montserrat", sans-serif;
  background-color: rgb(255, 255, 255);
  flex-direction: row;

  .panel {
    display: flex;
    font-family: "Montserrat", sans-serif;
    flex: 1 1;
    box-sizing: border-box;
    height: 100%;
    width: 40%;
    overflow-y: auto;
    max-width: 700px;
    margin: 0 0 10%;

    color: rgb(0, 0, 0);
    font-weight: bolder;
    font-size: 100px;

    .detail {
      margin-top: 26%;
      font-size: 60%;
      font-weight: 100;
      padding: 15%;
    }
  }

  .content {
    color: rgb(0, 0, 0);
    width: 50%;
    flex: 1 1;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;
    font-size: 100px;

    h1 {
      margin-bottom: -20px;
    }

    .inputs {
      font-size: 15px;
    }

    .title {
      // title of the content
      font-size: 38%;
      font-family: "Roboto Slab", serif;
      font-weight: 1000;
      letter-spacing: -1px;
    }

    h2 {
      // headings of the content
      font-size: 22%;
      letter-spacing: 1px;
      font-family: "Roboto Slab", serif;
      font-weight: 600;
      color: rgb(64, 130, 66);
    }

    .error {
      margin-bottom: 10px;
      font-size: 16%;
      font-weight: 400;
      line-height: 20px;
    }

    p {
      // text of the content
      font-size: 15%;
      font-weight: 400;
      line-height: 20px;

      a {
        text-decoration: none;

        &:link {
          color: rgb(255, 0, 0);
        }
        &:visited {
          color: rgb(255, 0, 0);
        }
      }
    }
  }
}
</style>
