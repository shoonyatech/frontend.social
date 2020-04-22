<template>
  <div class="online-users">
    <h1 class="title">
      Users on this page
    </h1>
    <div
      v-for="user in onlineUsers"
      :key="user._id"
      class="user"
    >
      <UserAvatar :user="{profilePic: user.avatar, ...user}" />
      {{ user.name }}
    </div>
  </div>
</template>
<script>
import userPageService from "@/services/user-page.service";
import UserAvatar from "@/components/common/UserAvatar";
import { uniqBy } from 'lodash';
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      onlineUsers : [],
      interval : null,
    }
  },
  watch: {
    $route() {
      const signedInUser = this.$store.state.signedInUser;
      if (signedInUser) {
        var user = {
          username: signedInUser.username,
          avatar: signedInUser.profilePic,
          name: signedInUser.name,
        };
        setTimeout(() => {
          userPageService.addOnlineUser(user);
        }, 1000);
      }
    }
  },
  created() {
    // wait for 1 sec to finish previous API call
    setTimeout(() => {
      this.getOnlineUsers();
    }, 2000);
    this.interval = setInterval(() => {
      this.getOnlineUsers();
    }, 4000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },

  methods: {
    getOnlineUsers() {
      userPageService
        .getOnlineUsers()
        .then(res => {
          this.onlineUsers = uniqBy(res, (x) => x.username);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
.online-users {
  padding: 0 20px;
  .user {
    padding: 2px 0;
    
  }
  .title {
    font-size: 1rem;
  }
}
</style>