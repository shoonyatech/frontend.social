import config from "./config";

export function getCookieDomainUrl() {
  try {
    return window.location.hostname;
  } catch (e) {}

  return "";
}

export function getRedirectUri(uri) {
  try {
    return uri != null
      ? `${window.location.origin}${uri}`
      : window.location.origin;
  } catch (e) {}

  return uri || null;
}

export default {
  baseUrl: config.api,
  tokenName: "access_token",
  tokenPrefix: "vueauth",
  storageType: "cookieStorage",
  providers: {
    facebook: {
      name: "facebook",
      url: "/auth/facebook",
      authorizationEndpoint: "https://www.facebook.com/v5.0/dialog/oauth",
      redirectUri: getRedirectUri("/signin/callback"),
      requiredUrlParams: ["display", "scope"],
      scope: ["email"],
      scopeDelimiter: ",",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 580, height: 400 },
      clientId: config.auth.facebook.clientId,
      clientSecret: config.auth.facebook.clientSecret
    },

    github: {
      name: "github",
      url: "/auth/github",
      authorizationEndpoint: "https://github.com/login/oauth/authorize",
      redirectUri: getRedirectUri("/signin/callback"),
      optionalUrlParams: ["scope"],
      scope: ["user:email"],
      scopeDelimiter: " ",
      oauthType: "2.0",
      popupOptions: { width: 1020, height: 618 },
      clientId: config.auth.github.clientId,
      clientSecret: config.auth.github.clientSecret
    },

    twitter: {
      name: "twitter",
      url: "/auth/twitter",
      authorizationEndpoint: "https://api.twitter.com/oauth/authenticate",
      redirectUri: getRedirectUri("/signin/callback"),
      oauthType: "1.0",
      popupOptions: { width: 495, height: 645 },
      clientId: config.auth.twitter.clientId,
      clientSecret: config.auth.twitter.clientSecret
    },

    bitbucket: {
      name: "bitbucket",
      url: "/auth/bitbucket",
      authorizationEndpoint: "https://bitbucket.org/site/oauth2/authorize",
      redirectUri: getRedirectUri("/"),
      optionalUrlParams: ["scope"],
      scope: ["email"],
      scopeDelimiter: " ",
      oauthType: "2.0",
      popupOptions: { width: 1020, height: 618 }
    },

    linkedin: {
      name: "linkedin",
      url: "/auth/linkedin",
      authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
      redirectUri: getRedirectUri(),
      requiredUrlParams: ["state"],
      scope: ["r_emailaddress"],
      scopeDelimiter: " ",
      state: "STATE",
      oauthType: "2.0",
      popupOptions: { width: 527, height: 582 }
    }
  }
};
