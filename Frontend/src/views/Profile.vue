<template>
  <section class="container">
    <h1 class="margin-bot name">Muhammad Ammar</h1>

    <p class="margin-bot connections">500+ connections</p>

    <p class="divider">___________________</p>

    <p class="margin-bot bio">Aspiring brother trying to do brotherly things</p>

    <p class="divider">___________________ </p>
    <div class="margin-bot resume">Ammar's Portfolio: <span class="fileColor">Resume.pdf</span> </div>
  </section>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  font-family: "Montserrat", sans-serif;
  padding: 40px;

  font-weight: 600;
  font-size: 100px;

  text-align: left;
  width: 700px;
  height: 400px;
  margin: 30px auto;

box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.076);
  .divider {
    margin-top: -20px;
    font-size: 20%;
    color: rgba(0, 0, 0, 0.302);
  }
  .margin-bot {
    margin-bottom: 15px;
  }
  .name {
    font-size: 30%;
  }

  .connections {
    color: rgb(112, 112, 112);
    font-size: 15%;
    margin-top: -10px;
  }

  .bio {
    margin-bottom: 40px;
    font-size: 16%;
  }

  .resume {
    font-size: 15%;
    font-weight: 600;
    color: rgb(58, 58, 58);

    .fileColor {
    font-size: 100%;
    font-weight: 400;
        color: rgb(0, 0, 0);
    }
  }
}
</style>
