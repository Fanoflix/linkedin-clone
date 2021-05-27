<template>
  <div @click="endorseSkill()">
    {{ name }}
    <p class="endorse">{{ endorsements }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  emits: ["refreshSkills"],
  props: ["targetUser", "id", "name", "endorsements"],
  methods: {
    endorseSkill() {
      if (this.content !== "") {
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
  text-align: left;
  p {
    text-align: right;
    display: inline;
  }
}
</style>
