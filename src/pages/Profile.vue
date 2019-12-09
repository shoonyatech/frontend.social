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
            v-for="item in profile.social"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            :is-editable="editMode"
            @change="onSocialChange"
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
                v-for="(skill, index) in profile.skills"
                :key="skill.name"
                :name="skill.name"
                :no-of-years="skill.noOfYears"
                :rating="skill.rating"
                :max="5"
                :is-editable="editMode"
                :index="index"
                @change="onSkillChange"
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
            :values="profile.conferences"
            :is-editable="editMode"
            @change="onConfChange"
          />
          <KeyMultiValue
            label="Meetups"
            :values="profile.meetups"
            :is-editable="editMode"
            @change="onMeetupChange"
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
              class="save-button"
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
      conferences: [],
      meetups: [],
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
  },
  methods: {
    onSocialChange: function(social) {
      let updatedSocial = this.profile.social.find(
        s => s.label == social.label
      );
      if (updatedSocial) {
        updatedSocial.value = social.value;
      }
    },
    onSkillChange: function({ index, skill }) {
      if (index < this.profile.skills.length) {
        this.profile.skills[index] = skill;
      } else {
        this.profile.skills.push(skill);
      }
    },
    addSkill: function(event) {
      this.profile.skills.push({});
    },
    onConfChange: function(confs) {
      this.profile.conferences = confs;
    },
    onMeetupChange: function(meetups) {
      this.profile.meetups = meetups;
    },
    edit: function(event) {
      this.editMode = true;
      if (!this.profile.skills.length) {
        this.profile.skills.push({
          name: "",
          noOfYears: "",
          expertiseLevel: 0
        });
      }
    },
    save: function(event) {
      this.editMode = false;
      if (
        this.profile.skills.length === 1 &&
        !this.profile.skills[0].name.length
      ) {
        this.profile.skills = [];
      }

      userService.updateUserProfile(this.profile);
    },
    cancel: function(event) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.profile = user;
        })
        .catch(e => {
          userService.signout();
          this.$router.push("/");
        });
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

.buttons {
  margin-bottom: 10px;
}

.save-button {
  margin-right: 10px;
}
</style>
