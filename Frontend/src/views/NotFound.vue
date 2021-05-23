<template>
  <section>
    <div>
      <p>
        Gentlemen, it is with great displeasure to inform you that... <br />
        you have dug too <span> deep! </span>
      </p>
      404 <br />
      NOT FOUND
    </div>
    <img src="../assets/404_wirecut.svg" alt="" />
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  font-family: "Montserrat", sans-serif;
  font-size: 90px;
  font-weight: 400;
  text-align: center;
  color: rgb(0, 0, 0);

  div {
    width: 100%;
    height: 300px;
    font-size: 100%;
    align-content: center;
    vertical-align: middle;
    text-shadow: 12px 40px 12px black;

    p {
      color: rgb(82, 82, 82);
      text-shadow: none;
      font-weight: 400;
      font-size: 30%;

      span {
        color: rgb(255, 255, 255);
        text-shadow: 0px 0px 5px rgb(0, 0, 0),0px 0px 6px rgb(0, 0, 0), 0px 0px 7px rgb(0, 0, 0);
      }
    }
  }

  img {
    width: 100%;
    margin-top: 50px;
    background: transparent !important;
  }
}

// Media Queries
$bp_1600: 1600px;
$bp_tablet: 768px;
$bp_phone: 446px;

@media screen and (max-width: $bp_1600) {
  section {
    font-size: 80px;
  }
}

@media screen and (max-width: $bp_tablet) {
  section {
    font-size: 60px;
  }
}

@media screen and (max-width: $bp_phone) {
  section {
    font-size: 40px;
  }
  section div p {
      color: rgb(214, 214, 214);
  }

  section img {
      margin-top: -100px;
  }
}
</style>
