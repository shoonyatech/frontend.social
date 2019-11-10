<template>
  <div class="profile">
    <b-container>
      <b-row>
        <b-col md="3">
          <img
            :src="profilePic"
            class="profile-photo"
          >
        </b-col>
        <b-col md="9">
          <div>Social links</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import userService from "@/services/user.service";

export default {
  components: {},
  data() {
    return {
      profilePhoto: ""
    };
  },
  created() {
    const profile = userService.getUserProfile();
    console.log(profile);
    this.profilePic = profile.profilePic;
  },
  methods: {}
};
</script>


<style scoped>
.profile-photo {
  height: 250px;
  background-color: #aada18;
  margin-right: 10px;
  text-align: "left";
  padding: 8px;
}
</style>
