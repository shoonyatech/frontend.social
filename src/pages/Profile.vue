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
            :is-editable="editMode"
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
          <label class="skills-label">Skills</label>
          <RangeSlider
            v-for="skill in skills"
            :key="skill.name"
            :label="skill.name"
            :value="skill.rating"
            :max="5"
            :is-editable="editMode"
          />
          <button class="skills-add">
            +
          </button>
        </b-col>
      </b-row>
      <b-row class="row">
        <b-col md="3">
          <div />
        </b-col>
        <b-col md="9">
          <KeyMultiValue
            label="Conferences"
            :value="confAttended"
            :is-editable="editMode"
          />
          <KeyMultiValue
            label="Meetups"
            :value="mettupAttended"
            :is-editable="editMode"
          />
        </b-col>
      </b-row>
      <b-row class="row">
        <b-col md="12">
          <div class="buttons">
            <button
              v-if="!editMode"
              @click="edit"
            >
              Edit
            </button>
            <button
              v-if="editMode"
              @click="save"
            >
              Save
            </button>
            <button
              v-if="editMode"
              @click="cancel"
            >
              Cancel
            </button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import KeyValue from "@/components/common/KeyValue";
import KeyMultiValue from "@/components/common/KeyMultiValue";
import RangeSlider from "@/components/common/RangeSlider";

export default {
  components: { KeyValue, KeyMultiValue, RangeSlider },
  data() {
    return {
      profilePhoto: "",
      social: [],
      skills: [],
      confAttended: [],
      mettupAttended: [],
      editMode: false
    };
  },
  created() {
    const profile = userService.getLoggedInUserProfile();
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
  methods: {
    edit: function(event) {
      this.editMode = true;
    },
    save: function(event) {
      this.editMode = false;
    },
    cancel: function(event) {
      this.editMode = false;
    }
  }
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

.skills-label {
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.buttons {
  width: 100%;
  text-align: right;
}

.skills-add {
  text-align: right;
}
</style>
