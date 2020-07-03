<template>
  <div class="tips-container">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="9">
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
        <b-col md="3">
          <div class="filters-wrapper">
            <TipsFilter
              v-if="tags.length"
              :tags="tags"
              :on-search-params-change="onSearchParamsChange"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TipStrip from "@/components/tips/TipStrip";
import TipsFilter from "@/components/tips/TipsFilter";
import tipsService from "@/services/tips.service";
import { orderBy } from "lodash";

export default {
  name: "Tips",
  components: {
    TipStrip,
    TipsFilter,
  },
  data() {
    return {
      tips: [],
      tags: [],
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
  async mounted() {
    this.loading = true;
    
    await Promise.all([this.getTips(), this.getTags()]);

    this.loading = false;
  },
  methods: {
    getTips(param = "") {
      return tipsService.getTips(param).then((resp) => {
        this.tips = orderBy(resp, ["createdAt"], ["desc"]);
      });
    },
    getTags() {
      return tipsService.getTags().then((resp) => {
        this.tags = resp.sort();
      });
    },
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
    onSearchParamsChange(param = "") {
      this.loading = true;
      this.getTips(param).then(() => {
        this.loading = false;
      });
      
    },
  },
};
</script>

<style lang="scss" scoped>
.tips-container {
  margin: 20px 10px;
  width: 100%;
}
.tips {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filters-wrapper {
  height: 100%;
  border-left: 1px solid #114273;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}
</style>
