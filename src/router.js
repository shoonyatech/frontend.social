import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import store from "@/vuex/store";
import userPageService from "@/services/user-page.service";

Vue.use(Router);

const router = new Router({
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
      name: "videocourse",
      component: () => import("./pages/VideoCourse.vue")
    },
    {
      path: "/event/:id",
      name: "eventDetails",
      component: () => import("./pages/EventDetails.vue")
    },
    {
      path: "/event/form/:id",
      name: "eventForm",
      component: () => import("./pages/EventForm.vue")
    },
    {
      path: "/join-meeting/:id",
      name: "joinMeeting",
      component: () => import("./pages/Zoom.vue")
    },
    {
      path: "/course",
      name: "course",
      component: () => import("./pages/Course.vue")
    },

  ]
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
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  fetch('/userpage', {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    keepalive: true,
  });
  userPageService.deleteUserPage();
}
export default router;