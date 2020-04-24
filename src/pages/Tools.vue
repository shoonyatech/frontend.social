<template>
  <b-container>
    <Loader v-show="loading" />
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
              <b-col>
                <Tool
                  :index="index"
                  :tool-id="section._id"
                  :tool="section"
                  :on-up-vote="upRating"
                  :on-down-vote="downRating"
                />
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
        md="4"
      >
        <button @click="showDialog()">
          + Add
        </button>
        <tool-filters :on-search-params-change="onSearchParamsChange" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Tool from "@/components/Tools/Tool";
import toolService from "@/services/tool.service";
import { ToastType, messages } from "@/constants/constants";
import eventBus from "@/utilities/eventBus";
import AddTool from "@/components/Tools/AddTool";
import ToolFilters from "@/components/Tools/ToolFilters";

export default {
  name: "Tools",
  components: {
    Tool,
    AddTool,
    ToolFilters
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
        "Documentation"
      ],
      sections: [],
      reviews: [],
      showAddToolDialog: false,
      rateUser: [],
      loading: false
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    sortedSectionArray: function() {
      function compare(a, b) {
        if (a.upRating - a.downRating > b.upRating - b.downRating) return -1;
        if (a.upRating - a.downRating < b.upRating - b.downRating) return 1;
        return 0;
      }
      return this.sections.slice().sort(compare);
    }
  },
  created() {
    this.getTools();
  },
  methods: {
    getTools() {
      this.loading = true;
      toolService
        .getTools()
        .then(response => {
          this.sections = response;
          this.sections.forEach((element, index) => {
            this.getRateUser(element._id);
          });
          this.loading = false;
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
          this.loading = false;
        });
    },
    getRateUser(toolId) {
      toolService
        .getRateUser(toolId)
        .then(response => {
          var getVote = this.sections.map(function(el) {
            var o = Object.assign({}, el);
            o.canVote = response.canVote;
            return o;
          });
          this.sections = getVote;
        })
        .catch(e => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
        });
    },
    upRating(section, index) {
      if (section.canVote === false) {
        return eventBus.$emit("show-toast", {
          body: messages.rate.rateAlreadyAdded,
          title: messages.generic.error,
          type: ToastType.ERROR
        });
      } else {
        var payload = {
          name: section.name,
          section: section.section,
          icon: section.icon,
          upRating: section.upRating + 1,
          downRating: section.downRating,
          review: section.review,
          technologies: section.technologies
        };
        toolService
          .upRate(section._id, payload)
          .then(response => {
            this.sections.splice(index, 1, response);
            this.addUserToRate(section._id, 1);
            // eventBus.$emit("show-toast", {
            //   body: messages.rate.rateAddSuccess,
            //   title: messages.generic.success
            // });
          })
          .catch(e => {
            eventBus.$emit("show-toast", {
              body: e.message,
              title: messages.generic.error,
              type: ToastType.ERROR
            });
          });
      }
    },
    downRating(section, index) {
      if (section.canVote === false) {
        return eventBus.$emit("show-toast", {
          body: messages.rate.rateAlreadyAdded,
          title: messages.generic.error,
          type: ToastType.ERROR
        });
      } else {
        var payload = {
          name: section.name,
          section: section.section,
          icon: section.icon,
          upRating: section.upRating - 1,
          downRating: section.downRating,
          review: section.review,
          technologies: section.technologies
        };
        toolService
          .downRate(section._id, payload)
          .then(response => {
            this.sections.splice(index, 1, response);
            this.addUserToRate(section._id, -1);
            // eventBus.$emit("show-toast", {
            //   body: messages.rate.rateDeleteSuccess,
            //   title: messages.generic.success
            // });
          })
          .catch(() => {
            eventBus.$emit("show-toast", {
              body: e.message,
              title: messages.generic.error,
              type: ToastType.ERROR
            });
          });
      }
    },
    addUserToRate(toolId, Rate) {
      var payload = {
        vote: Rate,
        toolId: toolId
      };
      toolService
        .addUserToRate(payload)
        .then(response => {
          this.getTools();
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
        });
    },
    refreshPage() {
      this.showAddToolDialog = false;
      this.getTools();
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.showAddToolDialog = true;
      }
    },
    onSearchParamsChange(param = "") {
      this.loading = true;
      toolService.searchToolsBy(param).then(sections => {
        this.sections = sections;
        this.loading = false;
      });
    }
  }
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
  border-bottom: 1px solid #114273;
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
