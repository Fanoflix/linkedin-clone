<template>
  <div>
    <h1 class="author">{{ author }}</h1>
    <h3 class="time">
      Posted at: {{ timeofPost }} <br />
      {{ date }}
    </h3>
    <p class="divider">_______________________________________________</p>
    <p class="content">{{ content }}</p>
    <p class="content likes" @click.prevent="likePost()">👍   {{ likes }} </p>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  props: ["_id", "content", "author", "time", "count"],
  data() {
    return {
      likes: this.count,
    };
  },
  methods: {
    likePost() {
      if (this.clicked) {
        this.likes -= 1;
      } else {
        this.likes += 1;
      }
      this.clicked = !this.clicked;
      
      axios
        .put(
          "http://localhost:3000/posts/likePost",
          {
            postId: this._id,
          },
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    timeofPost() {
      return dayjs(this.time).format("hh:mm A");
    },
    date() {
      return dayjs(this.time).format("DD-MM-YYYY");
    },
    token() {
      return this.$store.getters.authToken;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
* {
  font-family: "Montserrat", sans-serif;
  font-size: 100px;
  margin: 0;
  text-align: left;
}

.author {
  margin-left: 5px;
  font-weight: 600;
  font-size: 20%;
}
.time {
  margin-top: 0;
  font-weight: 400;
  font-size: 12%;
  margin-left: 5px;
}
.divider {
  color: rgb(158, 158, 158);
  margin-top: -5px;
  font-weight: 600;
  font-size: 10%;
  margin-left: 2px;
}

.content {
  font-family: "Open Sans", sans-serif;
  margin-top: 15px;
  font-size: 15%;
  font-weight: 400;
}

.likes {
  width: 60px;
  padding: 5px;
  border-radius: 10%;
  position: relative;
  will-change: transform;
  transition: all 0.2s ease-out;
    transform: scale(1.05);
  vertical-align: bottom;

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-out;
    background-color: rgb(225, 225, 225);
  }
}
</style>
