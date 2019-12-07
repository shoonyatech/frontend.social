<template>
  <div class="profile">
    <b-container>
      <b-row>
        <b-col md="3">
          <img
            :src="profile.profilePic"
            class="profile-photo"
          >
          <input
            v-if="editMode"
            v-model="profile.name"
          >
          <div
            v-else
            class="user-name"
          >
            {{ profile.name }}
          </div>
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
          <div class="skills">
            <label class="skills-label">Skills</label>
            <div class="skill-list">
              <SkillLevel
                v-for="skill in skills"
                :key="skill.name"
                :label="skill.name"
                :value="skill.rating"
                :max="5"
                :is-editable="editMode"
              />
            </div>
          </div>
          <div class="skills-actions">
            <button
              v-if="editMode"
              class="skills-add"
              @click="addSkill"
            >
              +
            </button>
          </div>
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
import SkillLevel from "@/components/Profile/SkillLevel";

export default {
  components: { KeyValue, KeyMultiValue, SkillLevel },
  data() {
    return {
      profile: {},
      profilePic: "",
      fullName: "",
      social: [],
      skills: [],
      confAttended: [],
      mettupAttended: [],
      editMode: false
    };
  },
  created() {
    userService
      .getLoggedInUserProfile()
      .then(user => {
      this.profile = user;
      })
      .catch(e => {
        userService.signout();
        this.$router.push("/");
    });

    // this.social = profile.social;
    // this.skills = profile.skills;
    // if (!this.skills.length) {
    //   this.skills.push({});
    // }
    // (this.confDetails = `${profile.confUpcoming.join(
    //   ", "
    // )} (Past: ${profile.confAttended.join(", ")})`),
    //   (this.mettupDetails = `${profile.meetupUpcoming.join(
    //     ", "
    //   )} (Past: ${profile.meetupAttended.join(", ")})`);
  },
  methods: {
    addSkill: function(event) {
      this.skills.push({});
    },
    edit: function(event) {
      this.editMode = true;
    },
    save: function(event) {
      this.editMode = false;
      userService.updateUserProfile(this.profile);
    },
    cancel: function(event) {
      this.editMode = false;
    }
  }
};
</script>

<style scoped>
.profile-photo {
  height: 220px;
  background-color: #aada18;
  margin-right: 10px;
  text-align: left;
  padding: 8px;
}

.user-name {
  font-weight: 700;
}

.row {
  margin-top: 20px;
}

.skills-label {
  width: 7rem;
  padding-left: 10px;
  text-align: left;
}

.buttons {
  width: 100%;
  text-align: right;
}

.skills-actions {
  width: 100%;
}

.skills-add {
  float: right;
}

.skills {
  display: flex;
}

.skill-list {
  flex: 1 1 auto;
}
</style>
