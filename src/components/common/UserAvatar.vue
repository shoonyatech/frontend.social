<template>
  <div class="avatar">
    <a :href="`/user/${user.username}`">
      <img
        :src="user.profilePic"
        class="profile-photo"
      >
    </a>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    user: { type: Object, required: true }
  },

  methods: {}
};
</script>

<style scoped>
.avatar {
  background-color: #aada18;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-photo {
  height: 50px;
  width: 50px;
  background-color: #aada18;
  text-align: left;
  padding: 2px;
  border-radius: 999px;
}
</style>
