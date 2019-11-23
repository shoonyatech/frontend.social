export default {
  auth: {
    facebook: {
      clientId: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
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
