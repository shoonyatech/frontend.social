<template>
  <div>
    <div>{{ userGroup }} from {{ city }}</div>
    <div class="city-users">
      <user-avatar
        v-for="user in users"
        :key="user.username"
        :user="user"
      />
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/common/UserAvatar";

export default {
  components: {
    UserAvatar
  },

  props: {
    userGroup: { type: String, required: true },
    city: { type: String, required: true },
    users: { type: Array, required: true }
  },

  methods: {}
};
</script>

<style scoped>
.city-users {
  display: flex;
  flex-direction: row;
}
</style>
