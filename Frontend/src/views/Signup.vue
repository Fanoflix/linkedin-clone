<template>
  <section>
    <div class="panel">
      <div class="detail">LinkedIn Account Signup</div>
    </div>
    <div class="content">
      <h1 class="title">LinkedIn</h1>
      <h2>Signup</h2>
      <p style="margin-top: -10px; margin-bottom: 40px">
        Fill in your details.
      </p>

      <!-- Form -->
      <form @submit.prevent="onSubmit()" class="inputs">
        Name<br />
        <input type="text" v-model="name" placeholder="Name" /><br />
        Email<br />
        <input type="text" v-model="email" placeholder="Email" /><br />
        Password<br />
        <input type="text" v-model="password" placeholder="Password" /><br />
        Retype Password<br />
        <input
          type="text"
          v-model="passwordCheck"
          placeholder="Retype Password"
        /><br /><br />
        <p style="color: red; font-weight: 600; font-size: 15px" v-show="emailError || passError" v-for="error in errorMessages"
          :key="error"
          class="error">
          {{ error }}
        </p>
        <p style="color: red; font-weight: 600; font-size: 15px" v-show="emailInUse" class="error">
          {{ emailUseError }}
        </p>
        <button>Signup</button>
      </form>

      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      errorVisibility: "hidden",
      emailUseError: "Email is already registered. Please Retry and Submit again.",
      emailInUse: false,
      emailError: false,
      passError: false,
      emailErrorMessage: "Please enter a valid Email.",
      passwordErrorMessage: "Passwords do not match. Please Retry and Submit again.",
      errorMessages: [],
    };
  },
  methods: {
    onSubmit() {
      this.emailInUse = false;
      this.matchingPassword = this.checkPasswordMatch();
      if (!this.matchingPassword) {
        console.log("Password failure");
        return;
      }
      if (!this.passError && !this.emailError && this.email !='') {
        console.log("Request Sent");
        axios
          .post("http://localhost:3000/auth/signup", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.status == 201) {
              console.log(response);
              console.log(response.status);
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            if (err.response.status == 404) {
              this.emailInUse = true;
            }
          });
      }
    },
    checkPasswordMatch() {
      if (this.password !== this.passwordCheck) {
        this.passError = true;
        if (!this.errorMessages.includes(this.passwordErrorMessage)) {
          this.errorMessages.push(this.passwordErrorMessage);
        }
        return false;
      } else {
        this.passError = false;
        this.errorMessages = this.errorMessages.filter(
          (item) => item !== this.passwordErrorMessage
        );
        return true;
      }
    },
  },
  watch: {
    email() {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.email
        )
      ) {
        this.emailError = true;
        if (!this.errorMessages.includes(this.emailErrorMessage)) {
          this.errorMessages.push(this.emailErrorMessage);
        }
      } else {
        this.emailError = false;
        this.errorMessages = this.errorMessages.filter(
          (item) => item !== this.emailErrorMessage
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
  flex-direction: row;
  background-color: rgb(255, 255, 255);

  .panel {
    display: flex;
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
    box-sizing: border-box;
    height: 100%;
    font-size: 100px;

    h1 {
      margin-bottom: -20px;
    }

    .inputs {
      font-size: 15px;

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
      color: rgb(148, 74, 74);
    }
    .error {
      margin-bottom: 10px;
      font-size: 16%;
      font-weight: 400;
      line-height: 20px;
    }

    p {
      // text of the content
      // margin-bottom: 10px;
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
