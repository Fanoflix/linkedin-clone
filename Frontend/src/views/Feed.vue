<template>
  <div class="feed">
    <create-post class="item create" />

    <!-- <section class="posts" v-for="post in posts" key="post">
        
    </section> -->
    <post
      class="item post"
      :content="content+'ddddsh dddddshdddddsh dddddsh rgb(240, 240, 240),rgb(240, 240, 240),rgb(240, 240, 240),ddddsh dddddshdddddsh dddddsh rgb(240, 240, 240),rgb(240, 240, 240),rgb(240, 240, 240),ddddsh dddddshdddddsh dddddsh rgb(240, 240, 240),rgb(240, 240, 240),rgb(240, 240, 240),'"
      author="Ammar"
      time="24 mins ago"
    /><post
      class="item post"
      :content="content"
      author="Ammar"
      time="24 mins ago"
    /><post
      class="item post"
      :content="content"
      author="Ammar"
      time="24 mins ago"
    /><post
      class="item post"
      :content="content"
      author="Ammar"
      time="24 mins ago"
    /><post
      class="item post"
      :content="
        content +
        'ashdashdashdashdashdha dashd dashd dashddashd dashasdasdasdasssssssssssssssssssssssssssssssssss sssssssssssssssssssssdddddddddddddddddddddddddddsh dddddsh dddddshdddddsh dddddsh rgb(240, 240, 240),rgb(240, 240, 240),rgb(240, 240, 240),'
      "
      author="Ammar"
      time="24 mins ago"
    />
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

export default {
  name: "Feed",
  components: { CreatePost, Post },
  data() {
    return {
      content:
        "SO i was trying to write this long message, but then I went otun dercity but there was this guy with a hanging jaw",
    };
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
    background-image: linear-gradient(20deg, rgb(240, 240, 240), rgb(255, 255, 255), rgba(236, 236, 236, 0.631));

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
