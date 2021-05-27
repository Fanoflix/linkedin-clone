<template>
  <div @click="endorseSkill()">
    {{ name }}
    <p class="endorse" v-if="endorsements !== 0">
      {{ endorsements }}
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  emits: ["refreshSkills"],
  props: ["isAuth", "targetUser", "id", "name", "endorsements"],
  methods: {
    endorseSkill() {
      if (this.content !== "" && this.isAuth) {
        axios
          .put(
            "http://localhost:3000/users/endorseSkill",
            {
              userId: this.targetUser,
              skillId: this.id,
            },
            {
              headers: {
                Authorization: `bearer ${this.token}`,
              },
            }
          )
          .then(() => {
            this.$emit("refreshSkills");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    token() {
      return this.$store.getters.authToken;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  border-radius: 20px;
  text-align: left;
  .endorse {
    text-align: right;
    display: inline;
    color: rgb(0, 39, 0);
    text-shadow: 0px 0px 5px rgb(0, 157, 0)
  }
}
</style>
