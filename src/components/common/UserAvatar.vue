<template>
  <div class="avatar">
    <a :href="`/user/${user.username}`">
      <img
        :src="user.profilePic || '/images/avatar.svg'"
        class="profile-photo"
        alt="Profile Pic"
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

<style scoped lang="scss">
.avatar {
  background-color: #114273;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
}

.profile-photo {
  height: 50px;
  width: 50px;
  background-color: #114273;
  text-align: left;
  padding: 2px;
  border-radius: 999px;
}
</style>
