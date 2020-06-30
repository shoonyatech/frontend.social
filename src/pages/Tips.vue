<template>
  <div>
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <h1>
            <span>Tool Tip</span>
            <button @click="onAddTips">
              + Add
            </button>
          </h1>
          <div class="tips">
            <TipStrip
              v-for="tip in tips"
              :key="tip.id"
              :tip="tip"
              @delete="onDelete($event)"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TipStrip from "@/components/tips/TipStrip";
import tipsService from "@/services/tips.service";
import { orderBy } from "lodash";

export default {
  name: "Tips",
  components: {
    TipStrip,
  },
  data() {
    return {
      tips: [],
      totalPages: 1,
      pageNo: 1,
      loading: false,
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
  },
  mounted() {
    this.loading = true;
    tipsService.getTips().then((resp) => {
      this.tips = orderBy(resp, ["createdAt"], ["desc"]);
      this.loading = false;
    });
  },
  methods: {
    onAddTips() {
      this.$router.push("/tip/form/new");
    },
    onDelete(id) {
      this.loading = true;
      tipsService.deleteTip(id).then((resp) => {
        this.tips = this.tips.filter((tip) => tip._id !== id);
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.host {
  width: 100%;
}

.tips {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
