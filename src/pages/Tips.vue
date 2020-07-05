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
          <div
            v-infinite-scroll="getTips"
            class="tips"
            :infinite-scroll-distance="limit"
            :infinite-scroll-disabled="isDisableInfiniteScroll"
          >
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
import { TipPageLimit } from "@/constants/constants";

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
      loading: false,
      page: 1,
      limit: TipPageLimit,
      queryParam: '',
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    isDisableInfiniteScroll() {
      return this.busy;
    }
  },
  async mounted() {
    this.loading = true;
    
    await this.getTags();

    this.loading = false;
  },
  methods: {
    getTips(param = "", filter) {
      if (this.busy) return;

      let query = "";

      this.busy = true;
      this.page = filter ? 1 : this.page || 1;
      this.queryParam = filter ? param : this.queryParam;

      return tipsService.getTips(this.queryParam, this.limit, this.page).then((resp) => {

          if (filter) {
            this.tips = resp;
          } else {
            this.tips = this.tips.concat(resp);
            if (resp.length > 0) {
              ++this.page;
            }
          }
          this.busy = false;
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
      this.getTips(param, true).then(() => {
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
