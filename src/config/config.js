import keys from "./keys";

export default {
  api: process.env.VUE_APP_API_URL || "http://localhost:3000",
  auth: {
    facebook: {
      clientId: keys.facebook.clientId,
      clientSecret: keys.facebook.clientSecret
    },
    github: {
      clientId: keys.github.clientId,
      clientSecret: keys.github.clientSecret
    },
    twitter: {
      clientId: keys.twitter.clientId,
      clientSecret: keys.twitter.clientSecret
    },
    bitbucket: {
      clientId: "",
      clientSecret: ""
    },
    linkedin: {
      clientId: "",
      clientSecret: ""
    }
  }
};
