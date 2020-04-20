<template>
  <b-container>
    <b-row>
      <b-col
        md="7"
        offset-md="1"
      >
        <div v-if="!showAddToolDialog">
          <div
            v-for="(sectionName, sectionIndex) in sectionsName"
            v-show="sections.length > 0"
            :key="sectionIndex"
          >
            <h1>
              <span>{{ sectionName }}</span>
            </h1>
            <b-row
              v-for="(section, index) in sortedSectionArray"
              v-show="section.section === sectionName"
              :key="index"
            >
              <b-col
                md="1"
                sm="1"
                class="col-xs-1"
              >
                <img
                  :src="`/images/up.svg`"
                  alt=""
                  class="up-down-arrow cursor-pointer"
                  @click="upRating(section, index)"
                >
                {{ section.upRating - section.downRating }}
                <img
                  :src="`/images/down.svg`"
                  alt=""
                  class="up-down-arrow cursor-pointer"
                  @click="downRating(section, index)"
                >
              </b-col>
              <b-col
                md="1"
                sm="1"
                class="p-0 col-xs-1"
              >
                <img
                  :src="section.icon"
                  class="w-100"
                  alt=""
                >
              </b-col>
              <b-col
                md="9"
                sm="9"
                class="tool-box mb-5 col-xs-9"
              >
                <h2 class="caption">
                  {{ section.name }}
                </h2>
                <SkillTags
                  v-if="section.technologies"
                  :skills="section.technologies"
                />
                <div class="subtitle">
                  <div class="mb-2">
                    {{ section.review }}
                  </div>
                </div>
                <div class="subtitle color-gray">
                  Reviews
                  <add-comment
                    ref="addcomment"
                    :on-save="saveComment"
                    :show-rating="false"
                    :index="index"
                    :tool-id="section._id"
                    class="mt-1"
                  />
                  <b-col md="12 mb-2">
                    <Comment
                      v-for="(review, ReviewIndex) in reviews"
                      v-show="review.toolId === section._id"
                      :key="ReviewIndex"
                      :index="ReviewIndex"
                      :comment="review"
                      :show-rating="false"
                      :on-delete="deleteComment"
                      :tool-id="section._id"
                      :on-edit="editComments"
                    />
                  </b-col>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <AddTool
          v-else
          @close="refreshPage()"
        />
      </b-col>
      <b-col
        v-if="!showAddToolDialog"
        md="2"
      >
        <button @click="showDialog()">
          + Add
        </button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SkillTags from "@/components/Skills/SkillTags";
import AddComment from "@/components/Comment/AddComment";
import Comment from "@/components/Comment/Comment";
import toolService from "@/services/tool.service";
import { ToastType, messages } from "@/constants/constants";
import eventBus from "@/utilities/eventBus";
import AddTool from "@/components/Tools/AddTool";

export default {
  name: "Tools",
  components: {
    SkillTags,
    AddComment,
    Comment,
    AddTool,
  },
  data() {
    return {
      sectionsName: [
        "Design",
        "Development",
        "Debug",
        "Test",
        "Build",
        "Deploy",
        "Documentation",
      ],
      sections: [],
      reviews: [],
      showAddToolDialog: false,
      rateUser: [],
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    sortedSectionArray: function() {
      function compare(a, b) {
        if (a.upRating-a.downRating > b.upRating-b.downRating)
          return -1;
        if (a.upRating-a.downRating < b.upRating-b.downRating)
          return 1;
        return 0;
      }
      return this.sections.slice().sort(compare);
    }
  },
  created() {
    this.getTools();
    this.getRateUser();
  },
  methods: {
    getTools() {
      toolService
        .getTools()
        .then((response) => {
          this.sections = response;
          this.sections.forEach((element) => {
            this.getComments(element._id);
          });
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
    getRateUser() {
      toolService
        .getRateUser()
        .then((response) => {
          this.rateUser = response;
        })
        .catch((e) => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
    getComments(toolId) {
      toolService
        .getComment(toolId)
        .then((response) => {
          this.reviews.push(...response);
        })
        .catch((e) => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
    upRating(section, index) {
      if(this.rateUser.some(user => user.toolId === section._id)){
        return eventBus.$emit("show-toast", {
          body: messages.rate.rateAlreadyAdded,
          title: messages.generic.error,
          type: ToastType.ERROR,
        });
      } else {
        var payload = {
          name: section.name,
          section: section.section,
          icon: section.icon,
          upRating: section.upRating + 1,
          downRating: section.downRating,
          review: section.review,
          technologies: section.technologies,
        };
        toolService
          .upRate(section._id, payload)
          .then((response) => {
            this.sections.splice(index, 1, response);
            this.addUserToRate(section._id, this.$store.state.signedInUser._id);
            eventBus.$emit("show-toast", {
              body: messages.rate.rateAddSuccess,
              title: messages.generic.success,
            });
          })
          .catch((e) => {
            eventBus.$emit("show-toast", {
              body: e.message,
              title: messages.generic.error,
              type: ToastType.ERROR,
            });
          });
      }
    },
    downRating(section, index) {
      if(this.rateUser.some(user => user.toolId === section._id)){
        return eventBus.$emit("show-toast", {
          body: messages.rate.rateAlreadyAdded,
          title: messages.generic.error,
          type: ToastType.ERROR,
        });
      } else {
        var payload = {
          name: section.name,
          section: section.section,
          icon: section.icon,
          upRating: section.upRating - 1,
          downRating: section.downRating,
          review: section.review,
          technologies: section.technologies,
        };
        toolService
          .downRate(section._id, payload)
          .then((response) => {
            this.sections.splice(index, 1, response);
            this.addUserToRate(section._id, this.$store.state.signedInUser._id);
            eventBus.$emit("show-toast", {
              body: messages.rate.rateDeleteSuccess,
              title: messages.generic.success,
            });
          })
          .catch(() => {
            eventBus.$emit("show-toast", {
              body: e.message,
              title: messages.generic.error,
              type: ToastType.ERROR,
            });
          });
      }
    },
    addUserToRate(toolId, userId) {
      var payload = {
        toolId: toolId,
        userId: userId
      }
      toolService
        .addUserToRate(payload)
        .then((response) => {
          this.rateUser.push(...response);
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
    saveComment(comment, isEdit, commentId, index) {
      if (isEdit) {
        var add = toolService.editComment(commentId, comment);
      } else {
        var add = toolService.addComment(comment);
      }
      add
        .then((response) => {
          if (isEdit) {
            this.reviews.splice(index, 1, response);
          } else {
            this.reviews.push(response);
          }
          eventBus.$emit("show-toast", {
            body: messages.comment.commentAddSuccess,
            title: messages.generic.success,
          });
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
    deleteComment(commentId, toolId, index) {
      toolService
        .deleteComment(toolId, commentId)
        .then((response) => {
          this.reviews.splice(index, 1);
          eventBus.$emit("show-toast", {
            body: messages.comment.commentDeleteSuccess,
            title: messages.generic.success,
          });
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
    editComments(commentId, comment, toolId, index) {
      this.$refs.addcomment.forEach((element) => {
        element.editComment(commentId, comment, toolId, index);
      });
    },
    refreshPage() {
      this.showAddToolDialog = false;
      this.getTools()
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.showAddToolDialog = true;
      }
    },
  },
};
</script>

<style scoped>
h2.caption {
  font-weight: normal;
  font-size: 22px;
}
.subtitle {
  font-size: 18px;
}
.body-title {
  font-size: 16px;
}
.tool-box {
  border-bottom: 1px solid #aada18;
}
.up-down-arrow {
  height: 25px;
  width: auto;
}
.cursor-pointer {
  cursor: pointer;
}
.color-gray {
  color: grey;
}
@media only screen and (max-width: 576px) {
  .col-xs-1 {
    width: 15%;
  }
  .col-xs-9 {
    width: 65%;
  }
}
</style>
