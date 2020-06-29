<template>
  <b-container
    v-if="!failedToFindVLog"
    class="bv-example-row"
  >
    <Loader v-show="loading" />
    <b-row class="vlog-details-container">
      <b-col md="12">
        <b-row
          v-if="youtubeVideoId"
          class="youtube-container"
        >
          <b-col md="12">
            <youtube
              :video-id="youtubeVideoId"
              width="100%"
              height="600"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="12"
            class="vlog-title"
          >
            <span>{{ vlog.title }}</span>
          </b-col>
        </b-row>
        
        <b-row>
          <b-col
            md="12"
            class="description"
          >
            <div v-html="vlog.description" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
  <h1
    v-else
    class="fail-message"
  >
    Opps! Failed to find VLog details
  </h1>
</template>
<script>
import vLogService from "@/services/vlog.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "VLogDetails",
  components: {

  },
  data() {
    return {
      failedToFindVLog: false,
      vLogId: null,
      vlog: {},
      loading: true,
      submissions: [],
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
  },
  computed: {
        youtubeVideoId() {
      return this.vlog.link
        ? this.parseYoutubeVideoId(this.vlog.link)
        : null;
    },
  },
  async created() {
    this.loading = true;
    this.vLogId = this.$route.params.id;
    if (!this.vLogId) {
      this.failedToFindVLog = true;
      return;
    }
  },
  mounted() {
    this.getVLog();
  },
  methods: {
    getVLog() {
      return vLogService
      .getVLogById(this.vLogId)
      .then(vlog => {
        this.vlog = vlog;
        this.loading = false;
      })
      .catch(() => {
        this.failedToFindVLog = true;
        this.loading = false;
      });
    },
    parseYoutubeVideoId(link) {
      try {
        const url = new URL(link);
        const urlParams = new URLSearchParams(url.search);
        return urlParams.get("v") || null;
      } catch (e) {
        return null;
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.vlog-title {
  display: flex;
  justify-content: space-between;
}

.youtube-container {
  padding: 10px 0;
}

.description {
  font-size: 0.75rem;
}
</style>
