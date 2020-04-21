import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/city/:cityName/:countryCode",
      name: "CityDetails",
      component: () => import("./pages/CityDetails.vue")
    },
    {
      path: "/city",
      name: "city",
      component: () => import("./pages/Cities.vue")
    },
    {
      path: "/jobs",
      name: "jobs",
      component: () => import("./pages/Jobs.vue")
    },
    {
      path: "/jobs/:jobId",
      name: "jobDetails",
      component: () => import("./pages/JobDetails.vue")
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./pages/Events.vue")
    },
    {
      path: "/learn",
      name: "learn",
      component: () => import("./pages/Learn.vue")
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("./pages/Tools.vue")
    },
    {
      path: "/tech/:skill",
      name: "techdetails",
      component: () => import("./pages/SkillDetails.vue")
    },
    {
      path: "/tech",
      name: "tech",
      component: () => import("./pages/Skills.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./pages/Signin.vue")
    },
    {
      path: "/signin/callback",
      name: "signincallback",
      component: () => import("./pages/HandleFBResponse.vue")
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./pages/PrivacyPolicy.vue")
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("./pages/TermsOfUse.vue")
    },
    {
      path: "/me",
      name: "me",
      component: () => import("./pages/Profile.vue?me")
    },
    {
      path: "/user/:username",
      name: "profile",
      component: () => import("./pages/Profile.vue")
    },
    {
      path: "/learn/videocourse",
      name: "course",
      component: () => import("./pages/VideoCourse.vue")
    },
    {
      path: "/event/:id",
      name: "eventDetails",
      component: () => import("./pages/EventDetails.vue")
    },
    {
      path: "/join-meeting/:id",
      name: "joinMeeting",
      component: () => import("./pages/Zoom.vue")
    }

  ]
});


15% 16