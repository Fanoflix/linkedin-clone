<template>
  <div>
    <span class="welcome">
      <h1>Hello!</h1>
      <h3>Welcome to LinkedOut.</h3>
    </span>

    <span class="centerLine"></span>

    <section class="step1">
      <p>build your profile, connect with your colleagues</p>
    </section>

    <section class="step2">
      <p>upload and share your resume with your connections</p>
    </section>

    <section class="step3">
      <p>connect with the world</p>
    </section>
    <!-- IF NOT LOGGED IN -->
    <button @click.prevent="goToSignup()">get started</button>
    <!-- ELSE -->
      <!-- Button to "post" link  -->
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Montserrat", sans-serif;
  font-size: 100px;
  padding: 0;
  user-select: none;
}

.welcome {
  text-align: center;
  font-size: 100px;
  margin-top: 30px;
}

h1 {
  font-size: 65%;
  margin-bottom: -30px;
  margin-top: 40px;
  font-weight: bold;
}

h3 {
  font-size: 30%;
  margin-bottom: 10px;
  font-weight: 600;
}

p {
  font-size: 22%;
  font-weight: 600;
  color: rgb(123, 123, 123);
  font-variant: small-caps;
}

.centerLine {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgb(112, 112, 112);
  border: dotted 2px solid;
  height: 450px;
  width: 2px;
  margin: -100px -1px;
}
.step1 {
  position: fixed;
  text-align: right;

  // Centering
  top: 50%;
  left: 33%;
  width: 400px;
  height: 200px;
  margin: -100px -200px;
}

.step2 {
  position: fixed;
  text-align: left;

  // Centering
  top: 60%;
  left: 67%;
  width: 400px;
  height: 200px;
  margin: -100px -200px;
}

.step3 {
  position: fixed;
  text-align: right;

  // Centering
  top: 70%;
  left: 33%;
  width: 400px;
  height: 200px;
  margin: -100px -200px;
}

button {
  position: fixed;

  // Centering
  top: 72%;
  left: 67%;
  height: 60px;
  width: 150px;
  margin: -30px -200px;
  border: 3px solid rgb(0, 0, 0);
  font-weight: 600;
  color: rgb(123, 123, 123);

  will-change: border;
  transition: all 1s ease-in-out;
  box-shadow: -8px 8px 0px rgba($color: #00e5ff, $alpha: 1.0), 6px -6px 0px rgba($color: #ff00a2, $alpha: 0.8), 15px 18px 0px rgba($color: #15ff00, $alpha: 0.6);

  &:hover {
    transition: all 0.15s ease-in-out;
    font-weight: 1000;
    color: white;
    border-color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0);
    transform: translate(5px, -5px);
    box-shadow: -8px 8px 10px 0px rgba($color: #00e5ff, $alpha: 1.0), 6px -6px 10px 0px rgba($color: #ff00a2, $alpha: 0.8), 15px 18px 10px 0px rgba($color: #15ff00, $alpha: 0.6);
  }

  background-color: white;
  font-variant: small-caps;
  font-size: 22%;
  text-decoration: none;
}
</style>
