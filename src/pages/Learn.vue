<template>
  <div class="learn">
    <b-container>
      <b-row>
        <LatestArticles />
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


<style scoped>
</style>