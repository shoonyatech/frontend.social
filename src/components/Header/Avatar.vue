<template>
  <div class="host">
    <img
      :src="profilePic"
      class="profile-photo"
    >
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    profilePic: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.profile-photo {
  height: 50px;
  width: 50px;
  background-color: #aada18;
  margin-right: 10px;
  text-align: left;
  padding: 2px;
  border-radius: 999px;
}
</style>
