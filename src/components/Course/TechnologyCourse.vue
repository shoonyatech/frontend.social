<template>
  <div class="events">
    <h1>Available Courses</h1>
    <div
      v-infinite-scroll="loadCourses"
      infinite-scroll-disabled="isDisableInfiniteScroll"
      infinite-scroll-distance="limit"
    >
      <div v-if="courses.length">
        <course-strip
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
        />
      </div>
      <div v-else>
        No courses found!
      </div>
    </div>

    <br>
  </div>
</template>

<script>
import CourseStrip from '@/components/Course/CourseStrip';
import courseService from '@/services/course.service';

export default {
	name: 'Course',
	components: {
		CourseStrip,
	},
	props: {
		skill: {
			type: String,
			default: null,
			required: false,
		},
		infiniteScroll: {
			type: Boolean,
			default: false,
		},
		limit: {
			type: Number,
			default: 25,
		},
	},
	data() {
		return {
			courses: [],
			page: 1,
			selectedSkill: '',
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
		this.selectedSkill = `&skills=${this.skill}`;
		if (!this.infiniteScroll) {
			this.loadCourses('');
		}
	},
	methods: {
		onSearchParamsChange(param = '') {
			this.loadCourses(param);
		},
		loadCourses(param, action) {
			switch (action) {
				case 'previous':
					action = -1;
					break;
				case 'next':
					action = 1;
					break;
				default:
					action = 0;
					break;
			}
			this.busy = false;
			this.limit = this.limit || 25;
			this.page = action + this.page || 1;

			courseService
				.getCourses(this.selectedSkill, this.limit, this.page)
				.then((res) => {
					console.log(param, 'param');
					var courses = res.results;
					if (!this.infiniteScroll) {
						this.courses = courses;
					} else {
						this.courses = this.courses.concat(courses);
						if (courses.length > 0) {
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
}

.events {
	text-align: left;
	width: 100%;
}

.courtesy {
	font-size: 0.75rem;
	text-align: right;
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

.course-card {
	margin: 0.5rem;
	display: flex;
	flex-direction: column;
	text-align: center;
	width: 100%;
}
</style>
