<template>
  <div class="feed">
    <create-post @get-new-post="getNewPost" class="item create" />

    <section class="posts" v-for="post in allPosts" :key="post._id">
      <post
        class="item post"
        :_id="post._id"
        :author="post.author.name"
        :count="post.count"
        :content="post.content"
        :time="post.createdAt"
      />
    </section>
  </div>
</template>

<script>
import axios from "axios";

import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

export default {
  name: "Feed",
  components: { CreatePost, Post },
  data() {
    return {
      time: 0,
      content: "",
      userPosts: {},
      conPosts: {},
      allPosts: {},
    };
  },
  methods: {
    getNewPost() {
      this.getUserPosts();
      this.getConPosts();
    },
    getConPosts() {
      axios
        .get("http://localhost:3000/posts/getConPosts", {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.conPosts = res.data.posts;
          this.allPosts = { ...this.allPosts, ...this.conPosts };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserPosts() {
      axios
        .get("http://localhost:3000/posts/getUserPosts", {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.userPosts = res.data.posts;
          this.allPosts = { ...this.allPosts, ...this.userPosts };
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
    } else {
      this.getConPosts();
      this.getUserPosts();
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    token() {
      return this.$store.getters.authToken;
    },
  },
};
</script>

<style lang="scss" scoped>
.feed {
  width: 800px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .item {
    width: 600px;
    padding: 20px;
    margin-top: 25px;
    border-radius: 15px;
    background-color: rgba(232, 232, 232, 0.445);
    border-bottom: 4px solid rgba(0, 0, 0, 0.05);
    border-right: 4px solid rgba(0, 0, 0, 0.1);

    .create {
      margin-top: 25px;
      margin-bottom: 100px;
      height: 100px;
    }
    .post {
      height: auto;
    }
  }
}
</style>
