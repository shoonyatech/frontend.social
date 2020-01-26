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
          <div>
            <input
              v-if="editMode"
              v-model="profile.name"
              class="left-input"
            >
            <div
              v-else
              class="user-name"
            >
              {{ profile.name }}
            </div>
          </div>
          <div>
            <input
              v-if="editMode"
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
            <div v-if="editMode">
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
            :edit-mode="editMode"
            :city="profile.city"
            :country="profile.country"
            @change="onCityChange"
          />
        </b-col>
        <b-col
          md="9"
          sm="12"
        >
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
        <b-col
          md="3"
          sm="12"
        >
          <div />
        </b-col>
        <b-col
          md="9"
          sm="12"
        >
          <div class="skills">
            <b-row>
              <b-col
                md="3"
                sm="12"
              >
                <label class="skills-label">Skills</label>
              </b-col>
              <b-col
                md="9"
                sm="12"
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
                      :is-editable="editMode"
                      :index="index"
                      @change="onSkillChange"
                    />
                    <span
                      v-if="!editMode"
                      class="skills-delete-placeholder"
                    />
                    <button
                      v-if="editMode"
                      class="skills-delete"
                      :data-index="index"
                      @click="deleteSkill"
                    >
                      X
                    </button>
                  </span>
                </div>
              </b-col>
            </b-row>
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
        <b-col
          md="3"
          sm="12"
        >
          <div />
        </b-col>
        <b-col
          md="9"
          sm="12"
        >
          <EditEventList
            v-if="profile.eventIds"
            label="Events"
            :event-ids="profile.eventIds"
            :is-editable="editMode"
            @change="onEventChange"
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
import EditEventList from "@/components/Events/EditEventList";
import EditCity from "@/components/City/EditCity";
import SkillLevel from "@/components/Profile/SkillLevel";

export default {
  components: { KeyValue, EditEventList, EditCity, SkillLevel },
  data() {
    return {
      profile: {},
      profilePic: "",
      fullName: "",
      social: [],
      skills: [],
      events: [],
      editMode: false
    };
  },
  created() {
    const username = this.$route.params.username;

    if (username == null) {
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
        .getUserProfile(username)
        .then(user => {
          this.profile = user;
        })
        .catch(e => {
          alert("User " + username + " not found");
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

      try {
        userService.updateUserProfile(this.profile);
      } catch (e) {
        alert(e.message);
      }
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
}

.skills-add {
  float: right;
}

.skills-delete {
  flex: 0 0 auto;
  margin: 2px 0 0 10px;
  height: 1.5rem;
  background-color: rgb(212, 68, 68);
}

.skills-delete-placeholder {
  flex: 0 0 auto;
  display: inline-block;
  margin: 2px 0 0 10px;
  height: 1.5rem;
  width: 51px;
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
</style>
