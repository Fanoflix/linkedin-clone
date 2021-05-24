<template>
  <section class="container">
    <h1 class="name">Muhammad Ammar</h1>

    <form @submit.prevent="createPost()">
      <textarea
        class="texts"
        type="text"
        v-model="content"
        :placeholder="name + ', share something insightful!'"
      />
      <br />
      <button>Post</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: 'Ammar',
      content: "",
    };
  },
  methods: {
    createPost() {
      console.log(this.content);
      if (this.content !== "") {
        axios.post("http://localhost:3000/post", {
          content: this.content,
        });
      }

      this.content = "";
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  font-family: "Montserrat", sans-serif;
}

.name {
  text-align: left;
  font-weight: 400;
}
form {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 200px;

  .texts {
    &::placeholder {
      font-weight: 400;
    }
    resize: none;
    width: 567px;
    height: 100px;
    padding: 15px;
    vertical-align: top;
    background-color: rgb(255, 255, 255);
    margin-bottom: 5px;
    font-weight: 600;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.152) inset;
    border: none;
  }

  button {
    height: 30px;
    width: 80px;
    margin-top: -15px;
    color: rgb(0, 0, 0);
    background-color: rgb(233, 233, 233);

    &:active {
      background-color: rgb(0, 0, 0);
      color: rgb(255, 255, 255);
    }
  }
}
</style>
