<template>
  <div class="host">
    <div
      v-infinite-scroll="loads"
      infinite-scroll-disabled="isDisableInfiniteScroll"
      infinite-scroll-distance="limit"
    >
      <h1>
        <span>Blogs</span>

        <span v-if="$store.getters.isAdmin">
          <button
            v-if="!showAddBlogDialog"
            @click="showDialog()"
          >
            + Add
          </button>
        </span>
      </h1>
      <div
        v-if="!showAddBlogDialog"
        class="blogs"
      >
        <div v-if="blogs.length">
          <BlogStrip
            v-for="(blog, index) in blogs"
            :key="index"
            :blog="blog"
          />
        </div>
        <div v-else>
          No blogs found!
        </div>
        <div
          v-if="$store.getters.isAdmin"
          class="center-content"
        >
          <button
            class="mt-4"
            @click="showDialog()"
          >
            + Add more
          </button>
        </div>
      </div>
      <AddBlog
        v-else
        @close="refreshPage()"
      />
    </div>
  </div>
</template>

<script>
import BlogStrip from "@/components/Blogs/BlogStrip";
import AddBlog from "@/components/Blogs/AddBlog";

import blogService from "@/services/blog.service";

export default {
  name: "BlogPart",
  components: { BlogStrip, AddBlog },
  props: {
    skill: {
      type: String,
      default: null,
      required: false,
    },
    infiniteScroll: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      blogs: [],
      showAddBlogDialog: false,
      loading: false,
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    isDisableInfiniteScroll() {
      return !this.infiniteScroll || this.busy;
    },
  },
  created() {
    if (!this.infiniteScroll) {
      this.loads();
    }
  },
  methods: {
    refreshPage() {
      this.showAddBlogDialog = false;
      this.loads("refresh");
    },
    showDialog() {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
      } else {
        this.showAddBlogDialog = true;
      }
    },
    loads(action) {
      if (action === "refresh") {
        this.blogs = [];
        action = 0;
        this.page = 1;
      }
      this.busy = false;
      this.limit = this.limit || 10;
      this.page = action + this.page || this.page || 1;

      blogService
        .getLatestBlogs(this.skill, this.limit, this.page)
        .then((blogs) => {
          if (!this.infiniteScroll) {
            this.blogs = blogs.results;
            if (blogs.results === undefined) {
              this.blogs = blogs.results || [];
            }
          } else {
            this.blogs = this.blogs.concat(blogs.results);
            if (this.blogs.length > 0) {
              ++this.page;
            }
          }
          this.busy = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  margin-bottom: 2.5rem;
}

.blogs {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.blog {
  margin-bottom: 40px;
}

.courtesy {
  font-size: 0.75rem;
  text-align: right;
}
</style>
