<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col md="12">
          <LatestArticles />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LatestArticles from "@/components/Learn/LatestArticles";

export default {
  name: "Learn",
  components: { LatestArticles },
  data() {
    return {
      articles: []
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss"></style>
