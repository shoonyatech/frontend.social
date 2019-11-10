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
          <KeyValue
            v-for="item in social"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import KeyValue from "@/components/common/KeyValue";

export default {
  components: { KeyValue },
  data() {
    return {
      profilePhoto: "",
      social: []
    };
  },
  created() {
    const profile = userService.getUserProfile();
    console.log(profile);
    this.profilePic = profile.profilePic;
    this.social = profile.social;
  },
  methods: {}
};
</script>


<style scoped>
.profile-photo {
  height: 200px;
  background-color: #aada18;
  margin-right: 10px;
  text-align: "left";
  padding: 8px;
}
</style>
