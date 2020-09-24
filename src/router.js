import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import store from '@/vuex/store';
import userPageService from '@/services/user-page.service';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/city/:cityName/:countryCode',
			name: 'CityDetails',
			component: () => import('./pages/CityDetails.vue'),
		},
		{
			path: '/city',
			name: 'city',
			component: () => import('./pages/Cities.vue'),
		},
		{
			path: '/jobs',
			name: 'jobs',
			component: () => import('./pages/Jobs.vue'),
		},
		{
			path: '/jobs/:jobId',
			name: 'jobDetails',
			component: () => import('./pages/JobDetails.vue'),
		},
		{
			path: '/job/form/:id',
			name: 'jobForm',
			component: () => import('./pages/JobForm.vue'),
		},

		{
			path: '/events',
			name: 'events',
			component: () => import('./pages/Events.vue'),
		},
		{
			path: '/learn',
			name: 'learn',
			component: () => import('./pages/Learn.vue'),
		},
		{
			path: '/tools',
			name: 'tools',
			component: () => import('./pages/Tools.vue'),
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('./pages/UserActivity.vue'),
		},
		{
			path: '/tech/:skill',
			name: 'techdetails',
			component: () => import('./pages/SkillDetails.vue'),
		},
		{
			path: '/tech',
			name: 'tech',
			component: () => import('./pages/Skills.vue'),
		},
		{
			path: '/signin',
			name: 'signin',
			component: () => import('./pages/Signin.vue'),
		},
		{
			path: '/signin/callback',
			name: 'signincallback',
			component: () => import('./pages/HandleFBResponse.vue'),
		},
		{
			path: '/privacy',
			name: 'privacy',
			component: () => import('./pages/PrivacyPolicy.vue'),
		},
		{
			path: '/terms',
			name: 'terms',
			component: () => import('./pages/TermsOfUse.vue'),
		},
		{
			path: '/me',
			name: 'me',
			component: () => import('./pages/Profile.vue?me'),
		},
		{
			path: '/user/:username',
			name: 'profile',
			component: () => import('./pages/Profile.vue'),
		},
		{
			path: '/event/:id',
			name: 'eventDetails',
			component: () => import('./pages/EventDetails.vue'),
		},
		{
			path: '/event/form/:id',
			name: 'eventForm',
			component: () => import('./pages/EventForm.vue'),
		},
		{
			path: '/article/form/:id',
			name: 'articleForm',
			component: () => import('./pages/LearnForm.vue'),
		},
		{
			path: '/join-meeting/:id',
			name: 'joinMeeting',
			component: () => import('./pages/Zoom.vue'),
		},
		{
			path: '/learn/course/:id',
			name: 'courseDetails',
			component: () => import('./pages/CourseDetails.vue'),
		},
		{
			path: '/learn/course',
			name: 'course',
			component: () => import('./pages/Courses.vue'),
		},
		{
			path: '/learn/course/:courseid/:chapterno/:topicurl',
			name: 'videocourse',
			component: () => import('./pages/VideoCourse.vue'),
		},
		{
			path: '/blog',
			name: 'blog',
			component: () => import('./pages/Blog.vue'),
		},
		{
			path: '/quiz',
			name: 'quiz',
			component: () => import('./pages/Quiz.vue'),
		},
		{
			path: '/quiz/:id',
			name: 'quizDetails',
			component: () => import('./pages/QuizDetails.vue'),
		},
		{
			path: '/quiz/:id/run/:runId',
			name: 'quizRun',
			component: () => import('./pages/QuizRun.vue'),
		},
		{
			path: '/quiz/:id/play/:runId',
			name: 'quizPlay',
			component: () => import('./pages/QuizPlay.vue'),
		},
		{
			path: '/blog/:id/:blogname',
			name: 'blogDetails',
			component: () => import('./pages/BlogDetails.vue'),
		},
		{
			path: '/challenge',
			name: 'challenge',
			component: () => import('./pages/Challenges.vue'),
		},
		{
			path: '/challenge/:uniqueId',
			name: 'challengeDetails',
			component: () => import('./pages/ChallengeDetails.vue'),
		},
		{
			path: '/challenge/form/:id',
			name: 'challengeForm',
			component: () => import('./pages/ChallengeForm.vue'),
		},
		{
			path: '/catchup',
			name: 'catchup',
			component: () => import('./pages/VLogs.vue'),
		},
		{
			path: '/catchup/:id',
			name: 'catchupDetails',
			component: () => import('./pages/VLogDetails.vue'),
		},
		{
			path: '/freelancing',
			name: 'freelancing',
			component: () => import('./pages/VLogs.vue'),
		},
		{
			path: '/freelancing/:id',
			name: 'freelancingDetails',
			component: () => import('./pages/VLogDetails.vue'),
		},
		{
			path: '/vlog/form/:id',
			name: 'vLogForm',
			component: () => import('./pages/VLogForm.vue'),
		},
		{
			path: '/tips',
			name: 'tips',
			component: () => import('./pages/Tips.vue'),
		},
		{
			path: '/tip/form/:id',
			name: 'tipForm',
			component: () => import('./pages/TipForm.vue'),
		},
	],
});

router.beforeEach((to, from, next) => {
	if (store.state.signedInUser) {
		console.log(from, store.state);
		userPageService.deleteUserPage();
	}
	next();
});

router.afterEach((to, from) => {
	const signedInUser = store.state.signedInUser;
	if (store.state.signedInUser) {
		var user = {
			createdTime: Date.now(),
			username: signedInUser.username,
			avatar: signedInUser.profilePic,
			name: signedInUser.name,
		};
		console.log(to, store.state);
		setTimeout(() => {
			userPageService.addOnlineUser(user);
		}, 1000);
	}
});

window.onbeforeunload = () => {
	const authToken = JSON.parse(localStorage.getItem('authToken'));
	fetch('/userpage', {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
		keepalive: true,
	});
	userPageService.deleteUserPage();
};
export default router;
