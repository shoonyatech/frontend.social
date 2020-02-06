<template>
  <div class="profile">
    <b-container>
      <b-row>
        <b-col
          md="3"
          sm="12"
          class="photo-col"
        >
          <img
            :src="profile.profilePic"
            class="profile-photo"
          >
          <Section
            title="About me"
            class="about-me"
            :on-edit="editAboutMe"
            :on-save="saveAboutMe"
            :on-cancel="cancelAboutMe"
          >
            <input
              v-if="editModeAboutMe"
              v-model="profile.name"
              class="left-input"
            >
            <div
              v-else
              class="user-name"
            >
              {{ profile.name }}
            </div>
            <div>
              <input
                v-if="editModeAboutMe"
                v-model="profile.username"
                class="left-input"
              >
              <div
                v-else
                class="user-username"
              >
                @{{ profile.username }}
              </div>
            </div>
            <div>
              <div v-if="editModeAboutMe">
                <span class="radio">
                  <input
                    v-model="profile.category"
                    class="radio-input"
                    type="radio"
                    value="dev"
                  >
                  <span class="radio-label"> Dev</span>
                </span>
                <span class="radio">
                  <input
                    v-model="profile.category"
                    class="radio-input"
                    type="radio"
                    value="designer"
                  >
                  <span class="radio-label"> Designer</span>
                </span>
              </div>
              <div
                v-else
                class="user-name"
              >
                <span class="light-text">I am a </span>
                <span>{{
                  profile.category == "dev" ? "Developer" : "Designer"
                }}</span>
              </div>
            </div>
            <edit-city
              :edit-mode="editModeAboutMe"
              :city="profile.city"
              :country="profile.country"
              @change="onCityChange"
            />
          </Section>
        </b-col>
        <b-col
          md="9"
          sm="12"
        >
          <Section
            title="Portfolio and Social links"
            class="portfolio"
            :on-edit="editSocials"
            :on-save="saveSocials"
            :on-cancel="cancelSocials"
          >
            <KeyValue
              v-for="item in profile.social"
              :key="item.label"
              :label="item.label"
              :value="item.value"
              :is-editable="editModeSocials"
              @change="onSocialChange"
            />
          </Section>
          <Section
            title="My skills"
            class="my-skills"
            :on-edit="editSkills"
            :on-save="saveSkills"
            :on-cancel="cancelSkills"
          >
            <div class="skill-list">
              <div class="skill-header">
                <span class="skill-name" />
                <span class="skill-years">yrs</span>
                <span class="skill-rating">expertise</span>
                <span class="skills-delete-placeholder" />
              </div>

              <span
                v-for="(skill, index) in profile.skills"
                :key="index"
                class="skill-control"
              >
                <SkillLevel
                  :name="skill.name"
                  :no-of-years="skill.noOfYears"
                  :rating="skill.rating"
                  :max="4"
                  :is-editable="editModeSkills"
                  :index="index"
                  @change="onSkillChange"
                />
                <span
                  v-if="!editModeSkills"
                  class="skills-delete-placeholder"
                />
                <div
                  v-if="editModeSkills"
                  class="skills-delete"
                  :data-index="index"
                  @click="deleteSkill"
                >
                  <img
                    :src="`/images/delete.svg`"
                    class="icon-button"
                  >
                </div>
              </span>
            </div>
            <div class="skills-actions">
              <button
                v-if="editModeSkills"
                class="skills-add"
                @click="addSkill"
              >
                +
              </button>
            </div>
          </Section>
          <Section
            title="Events attended"
            class="events-attended"
            :on-edit="editEvents"
            :on-save="saveEvents"
            :on-cancel="cancelEvents"
          >
            <EditEventList
              v-if="profile.eventIds"
              label="Events attended"
              :event-ids="profile.eventIds"
              :is-editable="editModeEvents"
              @change="onEventChange"
            />
          </Section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import KeyValue from "@/components/common/KeyValue";
import EditEventList from "@/components/Events/EditEventList";
import EditCity from "@/components/City/EditCity";
import SkillLevel from "@/components/Profile/SkillLevel";
import Section from "@/components/common/Section";

export default {
  components: { KeyValue, EditEventList, EditCity, SkillLevel, Section },
  data() {
    return {
      profile: {},
      profilePic: "",
      fullName: "",
      social: [],
      skills: [],
      events: [],
      editModeAboutMe: false,
      editModeSocials: false,
      editModeSkills: false,
      editModeEvents: false,
      username: null
    };
  },
  created() {
    this.username = this.$route.params.username;

    if (this.username == null) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.profile = user;
        })
        .catch(e => {
          userService.signout();
          this.$router.push("/");
        });
    } else {
      userService
        .getUserProfile(this.username)
        .then(user => {
          this.profile = user;
        })
        .catch(e => {
          alert("User " + this.username + " not found");
        });
    }
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
    deleteSkill: function(event) {
      const index = event.target.dataset.index;
      this.profile.skills.splice(index, 1);
    },
    onEventChange: function(eventIds) {
      this.profile.eventIds = eventIds;
    },
    onCityChange: function(city) {
      this.profile.city = city.name;
      this.profile.country = city.country;
    },
    editAboutMe: function(event) {
      this.editModeAboutMe = true;
    },
    saveAboutMe: function(event) {
      this.editModeAboutMe = false;
      try {
        userService.updateUserProfile(this.profile);
      } catch (e) {
        alert(e.message);
      }
    },
    cancelAboutMe: function(event) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.profile = user;
        })
        .catch(e => {
          userService.signout();
          this.$router.push("/");
        });
      this.editModeAboutMe = false;
    },
    editSocials: function(event) {
      this.editModeSocials = true;
    },
    saveSocials: function(event) {
      this.editModeSocials = false;
      try {
        userService.updateUserProfile(this.profile);
      } catch (e) {
        alert(e.message);
      }
    },
    cancelSocials: function(event) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.profile = user;
          this.editModeSocials = false;
        })
        .catch(e => {
          userService.signout();
          this.$router.push("/");
        });
    },
    editSkills: function(event) {
      this.editModeSkills = true;
      if (!this.profile.skills.length) {
        this.profile.skills.push({
          name: "",
          noOfYears: "",
          expertiseLevel: 0
        });
      }
    },
    saveSkills: function(event) {
      this.editModeSkills = false;
      if (
        this.profile.skills.length === 1 &&
        !this.profile.skills[0].name.length
      ) {
        this.profile.skills = [];
      }

      try {
        userService.updateUserProfile(this.profile);
      } catch (e) {
        alert(e.message);
      }
    },
    cancelSkills: function(event) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.profile = user;
          this.editModeSkills = false;
        })
        .catch(e => {
          userService.signout();
          this.$router.push("/");
        });
    },
    editEvents: function(event) {
      this.editModeEvents = true;
    },
    saveEvents: function(event) {
      this.editModeEvents = false;
      try {
        userService.updateUserProfile(this.profile);
      } catch (e) {
        alert(e.message);
      }
    },
    cancelEvents: function(event) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.profile = user;
          this.editModeEvents = false;
        })
        .catch(e => {
          userService.signout();
          this.$router.push("/");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.profile-photo {
  max-width: 100%;
  background-color: #aada18;
  text-align: left;
  padding: 5px;
}

.user-name {
  font-weight: 700;
}

.row {
  margin-top: 20px;
}

.skills-label {
  width: 7rem;
  text-align: left;
}

.buttons {
  width: 100%;
  text-align: right;
}

.skill-header {
  display: flex;
  width: 100%;
  text-align: left;
}

.skill-name {
  flex: 0 0 auto;
  width: 6rem;
  margin-right: 0.5rem;
}

.skill-years {
  flex: 0 0 auto;
  width: 2rem;
  margin-right: 0.5rem;
}

.skill-rating {
  flex: 1 1 auto;
  margin: 2px auto;
  width: 100%;
  text-align: center;
}

.skill-rating-icon {
  flex: 1 1 auto;
  width: 20%;
  display: inline-block;
  text-align: center;
}

.skills-actions {
  width: 100%;
  text-align: right;
  padding-top: 20px;
}

.skills-delete {
  flex: 0 0 auto;
  margin-left: 10px;
  padding: 0;
  background-color: transparent;
}

.skills-delete-placeholder {
  flex: 0 0 auto;
  display: inline-block;
  margin-left: 10px;
  width: 30px;
}

.skills {
  display: flex;
}

.skill-list {
  flex: 1 1 auto;
}

.skill-control {
  display: flex;
}

.buttons {
  margin-bottom: 10px;
}

.save-button {
  margin-right: 10px;
}

.left-input {
  width: 100%;
}

.photo-col {
  margin-bottom: 40px;
}

.about-me,
.my-skills,
.events-attended {
  margin-top: 20px;
}

.events-attended {
  margin-bottom: 20px;
}
</style>
