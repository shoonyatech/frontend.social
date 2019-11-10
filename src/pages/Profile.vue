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
      <b-row class="row">
        <b-col md="3">
          <div />
        </b-col>
        <b-col md="9">
          <KeyValue
            v-for="skill in skills"
            :key="skill.name"
            :label="skill.name"
            :value="skill.rating"
          />
        </b-col>
      </b-row>
      <b-row class="row">
        <b-col md="3">
          <div />
        </b-col>
        <b-col md="9">
          <KeyValue
            label="Conferences"
            :value="confDetails"
          />
          <KeyValue
            label="Meetups"
            :value="mettupDetails"
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
      social: [],
      skills: [],
      confDetails: "",
      mettupDetails: ""
    };
  },
  created() {
    const profile = userService.getUserProfile();
    console.log(profile);
    this.profilePic = profile.profilePic;
    this.social = profile.social;
    this.skills = profile.skills;
    (this.confDetails = `${profile.confUpcoming.join(
      ", "
    )} (Past: ${profile.confAttended.join(", ")})`),
      (this.mettupDetails = `${profile.meetupUpcoming.join(
        ", "
      )} (Past: ${profile.meetupAttended.join(", ")})`);
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

.row {
  margin-top: 20px;
}
</style>
