<template>
  <div class="learn">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <BlogPart />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BlogPart from "@/components/Blogs/BlogPart";

export default {
  name: "Learn",
  components: { BlogPart },
  data() {
    return {
      articles: [],
      loading: false,
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss"></style>
