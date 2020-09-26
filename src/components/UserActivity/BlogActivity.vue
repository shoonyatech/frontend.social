<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="text"
        >
          Blog Page : {{ blogs.length }}
          <br>
          <UserBlogActivity
            v-for="(blog, index1) in blogs"
            :key="index1"
            :blog="blog"
            :profile="blog.createdBy"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserBlogActivity from '@/components/Blogs/UserBlogActivity';
import blogService from '@/services/blog.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'BlogActivity',
	components: { UserBlogActivity },
	props: {
		dateCreated: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {
			blogs: [],
		};
	},
	created() {
		blogService
			.getBlogsAddedOnDate(this.dateCreated)
			.then((blog) => {
				this.blogs = blog;
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
	},
};
</script>

<style scoped lang="scss">
.text {
	color: rgb(48, 190, 238);
}
</style>
