<template>
  <div class="avatar">
    <a :href="`/user/${user.username}`">
      <img :src="user.photo">
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
  height: 45px;
  width: 45px;
  background-color: #aada18;
  margin-right: 10px;
  border-radius: 50%;
  padding: 8px;
}
</style>
