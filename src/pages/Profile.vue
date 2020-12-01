<template>
  <div class="profile">
    <Loader v-show="loading" />
    <b-container>
      <b-card class="card">
        <b-row>
          <b-col
            md="3"
            sm="12"
          >
            <Section
              v-if="isEditable"
              title="Profile Image"
              :on-edit="editProfilePic"
              :on-save="saveProfilePic"
              :on-cancel="cancelProfilePic"
              :is-editable="isEditable"
            >
              <a :href="profile.profilePic">
                <img
                  :src="profile.profilePic"
                  class="user-profile-photo"
                  alt="profile"
                >
              </a>

              <input
                v-if="editModeProfilePic"
                id="file-upload"
                type="file"
                class="image-input"
                @change="image"
              >
            </Section>
            <a
              v-else
              :href="profile.profilePic"
            >
              <img
                :src="profile.profilePic"
                class="profile-photo"
                alt="profile"
              >
            </a>
            <div
              v-if="profile.badges && profile.badges.length"
              class="profile-badges"
            >
              <div
                v-for="item in profile.badges"
                :key="item"
                class="badges"
              >
                <img
                  :src="getBadgeImage(item)"
                  :alt="item"
                >
                <span>{{ item }}</span>
              </div>
            </div>
          </b-col>
          <b-col
            md="5"
            sm="12"
          >
            <Section
              title="About me"
              class="about-me"
              :on-edit="editAboutMe"
              :on-save="saveAboutMe"
              :on-cancel="cancelAboutMe"
              :is-editable="isEditable"
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
                    <span class="radio-label">Dev</span>
                  </span>
                  <span class="radio">
                    <input
                      v-model="profile.category"
                      class="radio-input"
                      type="radio"
                      value="designer"
                    >
                    <span class="radio-label">Designer</span>
                  </span>
                </div>
                <div
                  v-else
                  class="user-name"
                >
                  <span class="light-text">I am a</span>
                  <span>
                    {{ profile.category == 'dev' ? 'Developer' : 'Designer' }}
                  </span>
                </div>
              </div>
              <edit-city
                :edit-mode="editModeAboutMe"
                :city="profile.city"
                :country="profile.country"
                :show-error="!username"
                @change="onCityChange"
              />
            </Section>
            <Section
              ref="portfolio"
              title="Portfolio and Social links"
              class="portfolio"
              :on-edit="editSocials"
              :on-save="saveSocials"
              :on-cancel="cancelSocials"
              :is-editable="isEditable"
            >
              <span v-if="editModeSocials">
                <KeyValue
                  v-for="item in profile.social"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                  :is-editable="editModeSocials"
                  @change="onSocialChange"
                /></span>
              <span v-else>
                <span
                  v-for="item in profile.social"
                  :key="item.label"
                >
                  <a
                    v-if="item.value != ''"
                    class="social"
                    name="item.label"
                    rel="noopener"
                    :href="item.value"
                    target="_blank"
                  ><img
                     v-if="item.label === 'Github'"
                     class="social-image"
                     src="/images/github.svg"
                   >
                    <img
                      v-if="item.label === 'Twitter'"
                      class="social-image"
                      src="/images/twitter.svg"
                    ><img
                      v-if="item.label === 'LinkedIn'"
                      class="social-image"
                      src="/images/slack.svg"
                    ><img
                      v-if="item.label === 'Bitbucket'"
                      class="social-image"
                      src="/images/bitbucket.svg"
                    ><img
                      v-if="item.label === 'Medium'"
                      class="social-image"
                      src="/images/medium.svg"
                    ><img
                      v-if="item.label === 'Website'"
                      class="social-image"
                      src="/images/web.svg"
                    ><img
                      v-if="item.label === 'Stack Overflow'"
                      class="social-image"
                      src="/images/stack-overflow.svg"
                    >
                  </a>
                </span>
              </span>
            </Section>
          </b-col>
          <b-col
            md="4"
            sm="12"
          >
            <Section
              title="Public Profile"
              class="public-profile"
              :is-editable="false"
            >
              <div>
                <a
                  name="publicprofile"
                  class="user-public-profile"
                  :href="publicProfile"
                  target="_blank"
                  rel="noopener"
                >{{ publicProfile }}</a>
              </div>
            </Section>
            <Section
              v-if="!username"
              title="Referral link"
              class="referral-link"
              :is-editable="false"
            >
              <div>
                <a
                  name="referrallink"
                  class="user-referral-link"
                  :href="referralLink"
                  target="_blank"
                  rel="noopener"
                >{{ referralLink }}</a>
              </div>
            </Section>
          </b-col>
        </b-row>
      </b-card>
      <b-row>
        <b-col
          md="6"
          sm="12"
        >
          <b-card>
            <Section
              ref="mySkills"
              title="My skills"
              class="my-skills"
              :on-edit="editSkills"
              :on-save="saveSkills"
              :on-cancel="cancelSkills"
              :is-editable="isEditable"
            >
              <div class="skill-list">
                <span
                  v-for="(skill, index) in profile.skills"
                  :key="skill.name"
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
                    @click="deleteSkill(index)"
                  >
                    <img
                      :src="`/images/delete.svg`"
                      class="icon-button"
                      alt="delete"
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
          </b-card>
        </b-col>
        <b-col
          md="6"
          sm="12"
        >
          <b-card>
            <Section
              v-if="!username"
              :title="`Reward Points: ${rewardPoints}`"
              class="reward-points"
              :is-editable="false"
            >
              <div class="reward-points-options">
                <div>
                  <input
                    v-model="pointsToRedeem"
                    class="redeem-input"
                    type="number"
                    :disabled="rewardPoints < 1000"
                  >
                  <button
                    :disabled="!pointsToRedeem || rewardPoints < 1000"
                    @click="redeemRewardPoints()"
                  >
                    Redeem
                  </button>
                </div>
                <button
                  @click="showRewardTransactions = !showRewardTransactions"
                >
                  Transactions
                </button>
              </div>
              <div class="small-text">
                (You can Redeem only if reward points more than 1000)
              </div>
              <b-collapse
                id="collapse-1"
                v-model="showRewardTransactions"
                class="mt-2"
              >
                <b-card>
                  <RewardPointsTransactions
                    :values="rewardPointsTransactions"
                  />
                </b-card>
              </b-collapse>
            </Section>
          </b-card>
          <br>
          <b-card>
            <Section
              v-if="!username"
              title="Referrals"
              class="user-referrals-section"
              :is-editable="false"
            >
              <div class="user-referrals">
                <user-avatar
                  v-for="referral in referrals"
                  :key="referral.username"
                  :user="referral"
                />
              </div>
            </Section>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          md="12"
          sm="12"
        >
          <b-card class="card">
            <Section
              ref="programmingSkills"
              title="Programming Skills"
              class="programming-skills"
              :on-edit="editProgrammingSkills"
              :on-save="saveProgrammingSkills"
              :on-cancel="cancelProgrammingSkills"
              :is-editable="isEditable"
            >
              <div>
                <b-row
                  v-for="item in profile.programmingSkills"
                  :key="item.label"
                >
                  <b-col>
                    <span> {{ item.label }}</span>
                  </b-col>
                  <b-col class="programming-skills-values">
                    <div v-if="!editModeprogrammingSkills">
                      <span
                        v-for="(value, index) in item.values"
                        :key="index"
                        :style="{
                          fontWeight: value.level > 3 ? '700' : 'normal',
                          color: value.level > 3 ? '' : 'gray',
                          color: value.level == 5 ? 'black' : '',
                          fontSize:
                            value.level > 2
                              ? `${value.level * 5}px`
                              : `${value.level * 11}px`,
                        }"
                      >
                        <span v-if="value.skill != ''">
                          <span
                            v-if="value.level == 3"
                            :style="{ fontSize: '20px' }"
                          >{{ value.skill }}</span><span
                            v-else-if="value.level == 2"
                            :style="{ fontSize: '15px' }"
                          >{{ value.skill }}</span>
                          <span v-else>{{ value.skill }}</span>
                          <span v-if="index + 1 != item.values.length">, </span>
                        </span>
                        <span v-else>-</span>
                      </span>
                    </div>
                    <div v-else>
                      <div class="skill-header">
                        <span class="skill-name" />
                        <span class="skill-rating">expertise</span>
                        <span class="skills-delete-placeholder" />
                      </div>
                      <span
                        v-for="(value, index) in item.values"
                        :key="value.skill"
                        class="skill-control"
                      >
                        <ProgrammingSkills
                          :name="value.skill"
                          :rating="value.level"
                          :label="item.label"
                          :max="4"
                          :is-editable="editModeprogrammingSkills"
                          :index="index"
                          @change="onProgrammingSkillChange"
                        />
                        <span
                          v-if="!editModeprogrammingSkills"
                          class="skills-delete-placeholder"
                        />
                        <div
                          v-if="editModeprogrammingSkills"
                          class="skills-delete"
                          :data-index="index"
                          @click="deleteProgrammingSkill(index, item.label)"
                        >
                          <img
                            :src="`/images/delete.svg`"
                            class="icon-button"
                            alt="delete"
                          >
                        </div>
                        <div class="add-container">
                          <button
                            v-if="editModeprogrammingSkills"
                            class="add"
                            @click="addProgrammingSkills(item.label)"
                          >
                            +
                          </button>
                        </div>
                      </span>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </Section>
          </b-card>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <b-card class="card">
            <Section
              v-if="profile.experienceTimeline != null"
              ref="portfolio"
              title="Experience Timeline"
              class="portfolio"
              :on-edit="editExperienceTimeline"
              :on-save="saveExperienceTimeline"
              :on-cancel="cancelExperienceTimeline"
              :is-editable="isEditable"
            >
              <div
                v-if="
                  !editModeExperienceTimeline &&
                    profile.experienceTimeline.length > 0
                "
              >
                <Charts
                  :start="profile.experienceTimeline[0].start"
                  :end="profile.experienceTimeline[0].end"
                  :skills="profile.experienceTimeline[1].skills"
                  class="chart"
                />
              </div>
              <div v-else>
                <ExperienceTimelineSkill
                  :start="profile.experienceTimeline[0].start"
                  :end="profile.experienceTimeline[0].end"
                  :max="4"
                  :start-date-edit="true"
                  :is-editable="editModeExperienceTimeline"
                  @change="onExperienceTimelineStartDateChange"
                />
                <div
                  v-for="(item, indexSkill) in profile.experienceTimeline[1]
                    .skills"
                  :key="item.label"
                >
                  <br>
                  <span class="skill-control">
                    <ExperienceTimelineSkill
                      :label="item.skill"
                      :max="4"
                      :is-editable="editModeExperienceTimeline"
                      :index="indexSkill"
                      @change="onExperienceTimelineSkillChange"
                    />
                    <span
                      v-if="!editModeExperienceTimeline"
                      class="skills-delete-placeholder"
                    />
                    <div
                      v-if="editModeExperienceTimeline"
                      class="skills-delete"
                      :data-index="indexSkill"
                      @click="deleteExperienceTimeline(indexSkill, item.skill)"
                    >
                      <img
                        :src="`/images/delete.svg`"
                        class="icon-button"
                        alt="delete"
                      >
                    </div>
                    <div class="add-container">
                      <button
                        v-if="editModeExperienceTimeline"
                        class="add"
                        @click="addExperienceTimeline(item.skill)"
                      >
                        +
                      </button>
                    </div>
                  </span>
                  <div class="skill-header">
                    <span class="skill-rating">expertise</span>
                    <span class="skill-rating">Tags</span>
                    <span class="skills-delete-placeholder" />
                  </div>
                  <span
                    v-for="(time, index) in item.timeline"
                    :key="time.label"
                  >
                    <ExperienceTimeline
                      :name="time.year"
                      :rating="time.expertise"
                      :label="item.skill"
                      :tags="time.tags"
                      :max="4"
                      :is-editable="editModeExperienceTimeline"
                      :index="index"
                      @change="onExperienceTimelineChange"
                    />
                  </span>
                </div>
              </div>
            </Section>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="card">
            <Section
              ref="eventsAttended"
              title="Events attended"
              class="events-attended"
              :on-edit="editEvents"
              :on-save="saveEvents"
              :on-cancel="cancelEvents"
              :is-editable="isEditable"
            >
              <EditEventList
                v-if="profile.eventIds"
                label="Events attended"
                :event-ids="profile.eventIds"
                :is-editable="editModeEvents"
                @change="onEventChange"
              />
            </Section>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="card">
            <Section
              v-if="profile._id"
              :title="`${profile.name}'s Video Rooms (Click to Join call)`"
              class="private-video-section"
              :is-editable="false"
            >
              <EventMeetings
                :id="profile._id"
                type="USER"
                :is-editable="!username"
                :admins="[]"
              />
            </Section>
          </b-card><br>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <Section
              title="Activities"
              class="events-attended"
              :is-editable="editModeActivity && isEditable"
            >
              <div
                v-for="(activity, index) in newActivity"
                :key="index"
              >
                <section v-if="index > 0">
                  <span
                    v-if="
                      newActivity[index].createdAt !=
                        newActivity[index - 1].createdAt
                    "
                    class="activityDate"
                  ><br>{{ activity.createdAt }}</span>
                </section>
                <section
                  v-if="index === 0"
                  class="activityDate"
                >
                  {{ activity.createdAt }}
                </section>
                -
                {{ getActivityType(activity.activityType) }}
                {{ getModel(activity.model) }}
                <a :href="activity.pageLink">{{ activity.title }}</a>
              </div>
            </Section>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card>
            <Twitter :username="getTwitterUsername()" />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import config from '@/config/config.js';
import axios from 'axios';
import userService from '@/services/user.service';
import KeyValue from '@/components/common/KeyValue';
import EditEventList from '@/components/Events/EditEventList';
import EditCity from '@/components/City/EditCity';
import SkillLevel from '@/components/Profile/SkillLevel';
import ExperienceTimeline from '@/components/Profile/ExperienceTimeline';
import ExperienceTimelineSkill from '@/components/Profile/ExperienceTimelineSkill';
import ProgrammingSkills from '@/components/Profile/ProgrammingSkills';
import Section from '@/components/common/Section';
import EventMeetings from '@/components/Events/EventMeetings.vue';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import UserAvatar from '@/components/common/UserAvatar';
import RewardPointsTransactions from '@/components/Profile/RewardPointsTransactions.vue';
import Twitter from '@/components/Twitter/Twitter.vue';
import moment from 'moment';
import Charts from '@/components/Profile/ExperienceChart.vue';
export default {
  components: {
    KeyValue,
    EditEventList,
    EditCity,
    SkillLevel,
    Section,
    UserAvatar,
    EventMeetings,
    RewardPointsTransactions,
    Twitter,
    ProgrammingSkills,
    ExperienceTimeline,
    ExperienceTimelineSkill,
    Charts,
  },
  data() {
    return {
      cloudinaryUrl: config.cloudinaryUrl,
      cloudinaryUploadPreset: config.cloudinaryUploadPreset,
      profile: {},
      profilePic: '',
      fullName: '',
      social: [],
      skills: [],
      events: [],
      referrals: [],
      editModeAboutMe: false,
      editModeProfilePic: false,
      editModeprogrammingSkills: false,
      editModeExperienceTimeline: false,
      editModeSocials: false,
      editModeSkills: false,
      editModeEvents: false,
      username: null,
      publicProfile: null,
      loading: false,
      editModeActivity: false,
      activities: [],
      rewardPointsTransactions: [],
      showRewardTransactions: false,
      pointsToRedeem: null,
      newActivity: [],
      experienceTimeline: [],
      file: {},
      previousSkill: '',
    };
  },
  computed: {
    isEditable() {
      return this.$store.state.signedInUser &&
        this.$store.state.signedInUser.username === this.profile.username
        ? true
        : false;
    },
    referralLink() {
      return (
        window.origin + '?referrer=' + this.$store.state.signedInUser.username
      );
    },
    rewardPoints() {
      return this.rewardPointsTransactions.reduce((acc, val) => {
        if (val.credited) {
          return acc + val.credited;
        } else if (val.debited) {
          return acc - val.debited;
        }
        return acc;
      }, 0);
    },
  },
  created() {
    this.username = this.$route.params.username;
    const msg = this.$route.query.msg;

    if (msg === 'set-city') {
      alert(
        'Please update your city so that we can show you event details from your city'
      );
    }

    if (this.username == null) {
      this.loading = true;
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          user.skills = this.sortSkills(user.skills);
          if (user.experienceTimeline.length == 0) {
            let experience = [
              { start: '', end: '' },
              {
                skills: [
                  {
                    skill: '',
                    timeline: [],
                  },
                ],
              },
            ];
            var currentYear = new Date();
            currentYear = currentYear.getFullYear();
            experience[0].end = currentYear;
            experience[0].start = currentYear - 7;
            for (let year = currentYear - 7; year <= currentYear; year++) {
              const timeline = {
                year: year,
                expertise: 0,
                tags: [''],
              };
              experience[1].skills[0].timeline.push(timeline);
            }
            user.experienceTimeline = experience;
          }
          if (user.programmingSkills.length == 0) {
            let Skills = [
              { label: 'Languages', values: [{ skill: '', level: 1 }] },
              {
                label: 'Frameworks & Libraries',
                values: [{ skill: '', level: 1 }],
              },
              {
                label: 'Testing Frameworks & Libraries',
                values: [{ skill: '', level: 1 }],
              },
              {
                label: 'SDLC Methodologies',
                values: [{ skill: '', level: 1 }],
              },
              { label: 'Databases', values: [{ skill: '', level: 1 }] },
              { label: 'DI Tool', values: [{ skill: '', level: 1 }] },
              { label: 'ORM', values: [{ skill: '', level: 1 }] },
              { label: 'Operating Systems', values: [{ skill: '', level: 1 }] },
              { label: 'Tracking Tools', values: [{ skill: '', level: 1 }] },
              { label: 'CI/CD', values: [{ skill: '', level: 1 }] },
              { label: 'Source Controls', values: [{ skill: '', level: 1 }] },
              { label: 'Modeling Language', values: [{ skill: '', level: 1 }] },
              { label: 'Cloud Platforms', values: [{ skill: '', level: 1 }] },
              { label: 'Mobile Platforms', values: [{ skill: '', level: 1 }] },
              { label: 'Protocols', values: [{ skill: '', level: 1 }] },
            ];
            user.programmingSkills = Skills;
          }

          this.getReferrals();
          this.getRewardPoints();
          this.profile = user;
          this.getActivities('profile', this.profile.username);
          this.publicProfile = `https://www.frontend.social/user/${this.profile.username}`;
          this.loading = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
        });
    } else {
      this.loading = true;
      userService
        .getUserProfile(this.username)
        .then((user) => {
          if (user.experienceTimeline.length == 0) {
            let experience = [
              { start: '', end: '' },
              {
                skills: [
                  {
                    skill: '',
                    timeline: [],
                  },
                ],
              },
            ];
            var currentYear = new Date();
            currentYear = currentYear.getFullYear();
            experience[0].end = currentYear;
            experience[0].start = currentYear - 7;
            for (let year = currentYear - 7; year <= currentYear; year++) {
              const timeline = {
                year: year,
                expertise: 0,
                tags: [''],
              };
              experience[1].skills[0].timeline.push(timeline);
            }
            user.experienceTimeline = experience;
          }
          if (user.programmingSkills.length == 0) {
            let Skills = [
              { label: 'Languages', values: [{ skill: '', level: 1 }] },
              {
                label: 'Frameworks & Libraries',
                values: [{ skill: '', level: 1 }],
              },
              {
                label: 'Testing Frameworks & Libraries',
                values: [{ skill: '', level: 1 }],
              },
              {
                label: 'SDLC Methodologies',
                values: [{ skill: '', level: 1 }],
              },
              { label: 'Databases', values: [{ skill: '', level: 1 }] },
              { label: 'DI Tool', values: [{ skill: '', level: 1 }] },
              { label: 'ORM', values: [{ skill: '', level: 1 }] },
              { label: 'Operating Systems', values: [{ skill: '', level: 1 }] },
              { label: 'Tracking Tools', values: [{ skill: '', level: 1 }] },
              { label: 'CI/CD', values: [{ skill: '', level: 1 }] },
              { label: 'Source Controls', values: [{ skill: '', level: 1 }] },
              { label: 'Modeling Language', values: [{ skill: '', level: 1 }] },
              { label: 'Cloud Platforms', values: [{ skill: '', level: 1 }] },
              { label: 'Mobile Platforms', values: [{ skill: '', level: 1 }] },
              { label: 'Protocols', values: [{ skill: '', level: 1 }] },
            ];
            user.programmingSkills = Skills;
          }
          user.skills = this.sortSkills(user.skills);
          this.getActivities(this.username);
          this.profile = user;
          this.publicProfile = `https://www.frontend.social/user/${this.profile.username}`;
          this.loading = false;
        })
        .catch((e) => {
          alert('User ' + this.username + ' not found');
          this.loading = false;
        });
    }
  },
  methods: {
    image() {
      this.file = event.target.files[0];
    },
    getBadgeImage: function (name) {
      return `/images/badges/${name}.svg`;
    },
    onSocialChange: function (social) {
      let updatedSocial = this.profile.social.find(
        (s) => s.label == social.label
      );
      if (updatedSocial) {
        updatedSocial.value = social.value;
      }
    },
    onProgrammingSkillChange: function ({ index, skill }) {
      const programSkills = {
        skill: skill.name,
        level: skill.rating,
      };
      this.profile.programmingSkills.map((re) => {
        if (re.label == skill.label) {
          re.values.map((value, indexNumber) => {
            if (index < re.values.length) {
              re.values[index] = programSkills;
            } else {
              re.values.push(programSkills);
            }
          });
        }
      });
      this.profile = {
        ...this.profile,
        programmingSkills: this.profile.programmingSkills,
      };
    },
    onExperienceTimelineSkillChange: function ({ index, skill }) {
      this.profile.experienceTimeline[1].skills.map((skills) => {
        if (skill.previousLabel == skills.skill) {
          skills.skill = skill.label;
          this.previousSkill = skill.label;
        }
      });
      this.profile = {
        ...this.profile,
        experienceTimeline: this.profile.experienceTimeline,
      };
    },
    onExperienceTimelineStartDateChange: function ({ indexSent, year }) {
      year.start = parseInt(year.start);
      year.end = parseInt(year.end);
      this.profile.experienceTimeline[0].start = year.start;
      this.profile.experienceTimeline[0].end = year.end;
      this.profile.experienceTimeline[1].skills.map((re, ind) => {
        re.timeline.map((res, index) => {
          if (index == 0) {
            if (res.year < year.start) {
              this.profile.experienceTimeline[1].skills[ind].timeline.splice(
                0,
                year.start - res.year
              );
            }
            if (res.year > year.start) {
              let oldData = this.profile.experienceTimeline[1].skills[ind]
                .timeline;
              this.profile.experienceTimeline[1].skills[ind].timeline = [];
              for (let i = 0; i < res.year - year.start; i++) {
                let data = {
                  year: year.start + i,
                  tags: [''],
                  expertise: 0,
                };
                this.profile.experienceTimeline[1].skills[ind].timeline.push(
                  data
                );
              }
              for (let i = 0; i < oldData.length; i++) {
                this.profile.experienceTimeline[1].skills[ind].timeline.push(
                  oldData[i]
                );
              }
            }
          }
          if (index == re.timeline.length - 1) {
            if (res.year < year.end) {
              for (let i = 1; i <= year.end - res.year; i++) {
                let data = {
                  year: res.year + i,
                  tags: [''],
                  expertise: 0,
                };
                this.profile.experienceTimeline[1].skills[ind].timeline.push(
                  data
                );
              }
            }
            if (res.year > year.end) {
              this.profile.experienceTimeline[1].skills[ind].timeline.splice(
                re.timeline.length - (res.year - year.end),
                res.year - year.end
              );
            }
          }
        });
      });
      this.profile = {
        ...this.profile,
        experienceTimeline: this.profile.experienceTimeline,
      };
    },
    onExperienceTimelineChange: function ({ index, skill }) {
      if (skill.label == '') {
        skill.label = this.previousSkill;
      }
      const experienceTime = {
        year: skill.name,
        expertise: skill.rating,
        tags: skill.tags,
      };
      this.profile.experienceTimeline[1].skills.map((skills) => {
        if (skill.label == skills.skill) {
          skills.timeline.map((time, indexSkill) => {
            if (time.year == skill.name) {
              skills.timeline[index] = experienceTime;
            }
          });
        }
      });
      this.profile = {
        ...this.profile,
        experienceTimeline: this.profile.experienceTimeline,
      };
    },
    onSkillChange: function ({ index, skill }) {
      if (index < this.profile.skills.length) {
        this.profile.skills[index] = skill;
      } else {
        this.profile.skills.push(skill);
      }
    },
    sortSkills(skills = []) {
      return skills.sort((s1, s2) => {
        if (s1.rating === s2.rating) {
          return s2.noOfYears - s1.noOfYears;
        }
        return s2.rating - s1.rating;
      });
    },

    addSkill: function (event) {
      this.profile.skills.push({});
    },
    deleteSkill: function (index) {
      this.profile.skills.splice(index, 1);
    },
    addExperienceTimeline(label) {
      const timeLine = [];
      for (
        let year = this.profile.experienceTimeline[0].start;
        year <= this.profile.experienceTimeline[0].end;
        year++
      ) {
        const timeline = {
          year: year,
          expertise: 0,
          tags: [''],
        };
        timeLine.push(timeline);
      }
      this.profile.experienceTimeline[1].skills.push({
        skill: '',
        timeline: timeLine,
      });
    },
    deleteExperienceTimeline: function (index, label) {
      const timeLine = [];
      for (
        let year = this.profile.experienceTimeline[0].start;
        year <= this.profile.experienceTimeline[0].end;
        year++
      ) {
        const timeline = {
          year: year,
          expertise: 0,
          tags: [''],
        };
        timeLine.push(timeline);
      }
      this.profile.experienceTimeline[1].skills.map((re, indexNumber) => {
        if (re.skill == label) {
          if (index > 0) {
            this.profile.experienceTimeline[1].skills.splice(index, 1);
          } else {
            re.skill = '';
            re.timeline = timeLine;
          }
        }
      });
      this.profile = {
        ...this.profile,
        experienceTimeline: this.profile.experienceTimeline,
      };
    },
    addProgrammingSkills(label) {
      this.profile.programmingSkills.map((re) => {
        if (re.label == label) {
          re.values.push({ level: 1, skill: '' });
        }
      });
    },
    deleteProgrammingSkill: function (index, label) {
      this.profile.programmingSkills.map((re) => {
        if (re.label == label) {
          re.values.map((value, indexNumber) => {
            if (index == indexNumber) {
              if (index > 0) {
                re.values.splice(index, 1);
              } else {
                re.values[index].skill = '';
                re.values[index].level = 1;
              }
            }
          });
        }
      });
      this.profile = {
        ...this.profile,
        programmingSkills: this.profile.programmingSkills,
      };
    },
    onEventChange: function (eventIds) {
      this.profile.eventIds = eventIds;
    },
    onCityChange: function (city) {
      this.profile.city = city.name;
      this.profile.country = city.country;
    },
    editAboutMe: function (event) {
      this.editModeAboutMe = true;
    },
    saveAboutMe: function (event) {
      this.loading = true;
      this.editModeAboutMe = false;
      try {
        userService.updateUserProfile(this.profile);
        this.loading = false;
      } catch (e) {
        alert(e.message);
        this.loading = false;
      }
    },
    cancelAboutMe: function (event) {
      this.loading = true;
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          this.profile = user;
          this.loading = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
          this.loading = false;
        });
      this.editModeAboutMe = false;
    },

    editProfilePic: function (event) {
      this.editModeProfilePic = true;
    },
    saveProfilePic: function (event) {
      this.loading = true;

      var formData = new FormData();
      formData.append('file', this.file);
      formData.append('upload_preset', this.cloudinaryUploadPreset);
      axios({
        url: this.cloudinaryUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: formData,
      })
        .then((res) => {
          this.profile = { ...this.profile, profilePic: res.data.secure_url };
          const image = {
            imageUrl: res.data.secure_url,
            userId: this.profile._id,
          };
          userService
            .updateUserProfilePic(image)
            .then((image) => {
              eventBus.$emit('show-toast', {
                body: messages.picUpdate.picUpdateSuccess,
                title: messages.generic.success,
              });

              this.loading = false;
            })
            .catch(() => {
              eventBus.$emit('show-toast', {
                body: messages.picUpdate.picUpdateFailure,
                title: messages.generic.error,
                type: ToastType.ERROR,
              });

              this.loading = false;
            });
        })
        .catch(() => {
          eventBus.$emit('show-toast', {
            body: messages.picUpdate.picUpdateFailure,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });

          this.loading = false;
        });
      this.editModeProfilePic = false;
    },
    cancelProfilePic: function (event) {
      this.loading = true;
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          this.profile = user;
          this.loading = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
          this.loading = false;
        });
      this.editModeProfilePic = false;
    },
    editProgrammingSkills: function (event) {
      this.editModeprogrammingSkills = true;
    },
    saveProgrammingSkills: function (event) {
      this.loading = true;
      this.editModeprogrammingSkills = false;
      try {
        userService.updateUserProfile(this.profile);
        this.loading = false;
      } catch (e) {
        alert(e.message);
        this.loading = false;
      }
    },
    cancelProgrammingSkills: function (event) {
      this.loading = true;
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          this.$refs.portfolio.refresh();
          this.profile = user;
          this.editModeprogrammingSkills = false;
          this.loading = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
          this.loading = false;
        });
    },
    editExperienceTimeline: function (event) {
      this.editModeExperienceTimeline = true;
    },
    saveExperienceTimeline: function (event) {
      this.loading = true;
      this.editModeExperienceTimeline = false;
      try {
        userService.updateUserProfile(this.profile);
        this.loading = false;
      } catch (e) {
        alert(e.message);
        this.loading = false;
      }
    },
    cancelExperienceTimeline: function (event) {
      this.loading = true;
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          this.$refs.portfolio.refresh();
          this.profile = user;
          this.editModeExperienceTimeline = false;
          this.loading = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
          this.loading = false;
        });
    },

    editSocials: function (event) {
      this.editModeSocials = true;
    },
    saveSocials: function (event) {
      this.loading = true;
      this.editModeSocials = false;
      try {
        userService.updateUserProfile(this.profile);
        this.loading = false;
      } catch (e) {
        alert(e.message);
        this.loading = false;
      }
    },
    cancelSocials: function (event) {
      this.loading = true;
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          this.$refs.portfolio.refresh();
          this.profile = user;
          this.editModeSocials = false;
          this.loading = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
          this.loading = false;
        });
    },
    getTwitterUsername() {
      if (this.profile.social != null) {
        const username = this.profile.social.find((p) => p.label === 'Twitter');
        if (username) {
          if (
            username.value.match(
              '^https?://(www\.)?twitter\.com/(#!/)?([^/]+)(/\w+)*$'
            )
          ) {
            var user = username.value;
            user = user.slice(20, user.length);
            return user;
          }
          if (username.value.match('@')) {
            var user = username.value;
            user = user.slice(1, user.length);
            return user;
          }
          return username.value;
        }
      } else return '';
    },
    editSkills: function (event) {
      this.editModeSkills = true;
      if (!this.profile.skills.length) {
        this.profile.skills.push({
          name: '',
          noOfYears: '',
          expertiseLevel: 0,
        });
      }
    },
    saveSkills: function (event) {
      this.editModeSkills = false;
      if (
        this.profile.skills.length === 1 &&
        !this.profile.skills[0].name.length
      ) {
        this.profile.skills = [];
      }
      this.$store.dispatch(
        'createAndUpdateSkills',
        this.profile.skills.map((x) => x.name)
      );
      this.profile.skills = this.sortSkills(this.profile.skills);
      try {
        userService.updateUserProfile(this.profile);
      } catch (e) {
        eventBus.$emit('show-toast', {
          body: e.message,
          title: messages.generic.error,
          type: ToastType.ERROR,
        });
      }
    },
    cancelSkills: function (event) {
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          this.$refs.mySkills.refresh();
          this.profile = user;
          this.editModeSkills = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
        });
    },
    editEvents: function (event) {
      this.editModeEvents = true;
    },
    saveEvents: function (event) {
      this.loading = true;
      this.editModeEvents = false;
      try {
        userService.updateUserProfile(this.profile);
        this.loading = false;
      } catch (e) {
        alert(e.message);
        this.loading = false;
      }
    },
    cancelEvents: function (event) {
      this.loading = true;
      userService
        .getLoggedInUserProfile()
        .then((user) => {
          this.$refs.eventsAttended.refresh();
          this.profile = user;
          this.editModeEvents = false;
          this.loading = false;
        })
        .catch((e) => {
          userService.signout();
          this.$router.push('/');
          this.loading = false;
        });
    },
    getActivities(profile) {
      let finalDate;
      userService
        .getActivities(profile)
        .then((response) => {
          this.activities = response;
          this.activities.map((re) => {
            let data = moment(re.createdAt);
            let date = data._d;
            let createdAt =
              date.getDate() +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getFullYear();
            this.newActivity.push({ ...re, createdAt: createdAt });
          });
        })
        .catch((e) => {
          this.$router.push('/');
        });
    },
    getActivityType(type) {
      switch (type) {
        case 'c':
          return 'Created';
        case 'd':
          return 'Deleted';
      }
    },
    getModel(model) {
      switch (model) {
        case 't':
          return 'Tip';
        case 'e':
          return 'Event';
        case 'j':
          return 'Job';
        case 'a':
          return 'Article';
      }
    },
    getReferrals() {
      userService
        .getReferrals()
        .then((response) => {
          this.referrals = response.filter((x) => x != null);
        })
        .catch((e) => {
          console.log('failed to fetch referals');
        });
    },
    getRewardPoints() {
      userService.getRewardPoints().then((response) => {
        this.rewardPointsTransactions = response;
      });
    },
    redeemRewardPoints() {
      if (this.pointsToRedeem == 0 || this.pointsToRedeem > this.rewardPoints) {
        eventBus.$emit('show-toast', {
          body: messages.rewardPoints.invalidAmount,
          title: messages.generic.error,
          type: ToastType.ERROR,
        });
        return;
      }

      userService
        .redeemRewardPoints(this.pointsToRedeem)
        .then(() => {
          eventBus.$emit('show-toast', {
            body: messages.rewardPoints.success,
            title: messages.generic.success,
          });

          this.pointsToRedeem = null;
          this.getRewardPoints();
        })
        .catch(() => {
          eventBus.$emit('show-toast', {
            body: messages.rewardPoints.error,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  width: 100%;
  text-align: left;
}
.redeem-input {
  height: 52px;
}
button {
  padding: 10px;
}
b-card {
  margin: 10px;
}
.card {
  width: 100%;
}
.profile-photo {
  max-width: 100%;
  background-color: #114273;
  text-align: left;
  padding: 5px;
}
.chart {
  margin: 10px;
}
.profile-badges {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  .badges {
    position: relative;
    margin-top: 10px;
    width: 50px;
    height: 50px;
    img {
      max-width: 50px;
      max-height: 50px;
    }
    &:not(:last-of-type) {
      margin-right: 5px;
    }
    span {
      position: absolute;
      top: -21px;
      left: 0px;
      min-width: 100%;
      padding: 0px 6px;
      display: none;
      font-size: 14px;
      text-align: center;
      background-color: #114273;
      color: white;
    }
    &:hover {
      span {
        display: inline-block;
      }
    }
  }
}

.user-profile-photo {
  width: 100%;
  text-align: left;
}
.user-name {
  font-weight: 700;
  margin-bottom: 20px;
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
.image-input {
  width: 100%;
  font-size: 15px;
}
.photo-col {
  margin-bottom: 40px;
}

.about-me,
.public-profile,
.my-skills,
.events-attended,
.reward-points,
.referral-link,
.programming-skills {
  width: 100%;
}

.events-attended,
.user-referrals-section,
.private-video-section {
  margin-bottom: 20px;
}

.user-public-profile,
.user-referral-link {
  word-wrap: break-word;
}

.user-referrals {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.reward-points-options {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  input {
    width: 50%;
  }
  button {
    margin: 2px;
  }
}

.small-text {
  font-size: 15px;
}

.portfolio,
.programming-skills-values {
  width: 100%;
}
.activityDate {
  font-size: 20px;
  color: #8f8f8f;
}
.social {
  .social-image {
    height: 30px;
    width: 30px;
    margin: 5px;
  }
}
</style>
