<template>
  <div>
    <h1 class="author">{{ author }}</h1>
    <h3 class="time">{{ time }}</h3>
    <p class="divider">_______________________________________________</p>
    <p class="content">{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: ["content", "author", "time"],
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
* {
  font-family: "Montserrat", sans-serif;
  font-size: 100px;
  margin: 0;
  text-align: left;
}

.author {
  margin-left: 5px;
  font-weight: 600;
  font-size: 15%;
}
.time {
  margin-top: 0;
  font-weight: 400;
  font-size: 10%;
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
</style>
