import keys from "./keys";

export default {
  api: process.env.API_URL || "http://localhost:3000",
  auth: {
    facebook: {
      clientId: process.env.FB_CLIENT_ID || keys.facebook.clientId,
      clientSecret: process.env.FB_CLIENT_SECRET || keys.facebook.clientSecret
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || keys.github.clientId,
      clientSecret: process.env.GITHUB_CLIENT_SECRET || keys.github.clientSecret
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || keys.twitter.clientId,
      clientSecret:
        process.env.TWITTER_CLIENT_SECRET || keys.twitter.clientSecret
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
