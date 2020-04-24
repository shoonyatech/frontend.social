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
import { uniqBy } from "lodash";
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      onlineUsers: [],
      interval: null,
      intervalAddOnlineUser: null
    };
  },
  created() {
    // wait for 1 sec to finish previous API call
    // setTimeout(() => {
    //   this.addOnlineUser();
    // }, 2000);

    setTimeout(() => {
      this.getOnlineUsers();
    }, 2000);
    //this.intervalAddOnlineUser = setInterval(() => this.addOnlineUser(), 13000);
    this.interval = setInterval(() => this.getOnlineUsers(), 4000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.intervalAddOnlineUser) {
      clearInterval(this.intervalAddOnlineUser);
    }
  },

  methods: {
    getOnlineUsers() {
      const signedInUser = this.$store.state.signedInUser;
    
    var payload = {
        createdTime: Date.now(),
        username: signedInUser.username,
        avatar: signedInUser.profilePic,
        name: signedInUser.name,
        currentTime: Date.now()
      };

      userPageService.getOnlineUsers(payload).then(res => {
        this.onlineUsers = uniqBy(res, x => x.username);
      });
    },
    addOnlineUser() {
      const signedInUser = this.$store.state.signedInUser;
      var user = {
        createdTime: Date.now(),
        username: signedInUser.username,
        avatar: signedInUser.profilePic,
        name: signedInUser.name
      };
      userPageService.addOnlineUser(user);
    }
  }
};
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