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
  baseUrl: "http://localhost:3000",
  tokenName: "access_token",
  tokenPrefix: "vueauth",
  storageType: "cookieStorage",
  providers: {
    facebook: {
      name: "facebook",
      url: "/auth/facebook",
      authorizationEndpoint: "https://www.facebook.com/v5.0/dialog/oauth",
      redirectUri: getRedirectUri("/signin/fb"),
      requiredUrlParams: ["display", "scope"],
      scope: ["email"],
      scopeDelimiter: ",",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 580, height: 400 },
      clientId: "",
      clientSecret: ""
    },

    google: {
      name: "google",
      url: "/auth/google",
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      redirectUri: getRedirectUri(),
      requiredUrlParams: ["scope"],
      optionalUrlParams: ["display"],
      scope: ["profile", "email"],
      scopePrefix: "openid",
      scopeDelimiter: " ",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 452, height: 633 }
    },

    github: {
      name: "github",
      url: "/auth/github",
      authorizationEndpoint: "https://github.com/login/oauth/authorize",
      redirectUri: getRedirectUri("/signin/gh"),
      optionalUrlParams: ["scope"],
      scope: ["user:email"],
      scopeDelimiter: " ",
      oauthType: "2.0",
      popupOptions: { width: 1020, height: 618 },
      clientId: "",
      clientSecret: ""
    },

    instagram: {
      name: "instagram",
      url: "/auth/instagram",
      authorizationEndpoint: "https://api.instagram.com/oauth/authorize",
      redirectUri: getRedirectUri(),
      requiredUrlParams: ["scope"],
      scope: ["basic"],
      scopeDelimiter: "+",
      oauthType: "2.0",
      popupOptions: { width: null, height: null }
    },

    twitter: {
      name: "twitter",
      url: "/auth/twitter",
      authorizationEndpoint: "https://api.twitter.com/oauth/authenticate",
      redirectUri: getRedirectUri(),
      oauthType: "1.0",
      popupOptions: { width: 495, height: 645 }
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
    },

    live: {
      name: "live",
      url: "/auth/live",
      authorizationEndpoint: "https://login.live.com/oauth20_authorize.srf",
      redirectUri: getRedirectUri(),
      requiredUrlParams: ["display", "scope"],
      scope: ["wl.emails"],
      scopeDelimiter: " ",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 500, height: 560 }
    },

    oauth1: {
      name: null,
      url: "/auth/oauth1",
      authorizationEndpoint: null,
      redirectUri: getRedirectUri(),
      oauthType: "1.0",
      popupOptions: null
    },

    oauth2: {
      name: null,
      url: "/auth/oauth2",
      clientId: null,
      redirectUri: getRedirectUri(),
      authorizationEndpoint: null,
      defaultUrlParams: ["response_type", "client_id", "redirect_uri"],
      requiredUrlParams: null,
      optionalUrlParams: null,
      scope: null,
      scopePrefix: null,
      scopeDelimiter: null,
      state: null,
      oauthType: "2.0",
      popupOptions: null,
      responseType: "code",
      responseParams: {
        code: "code",
        clientId: "clientId",
        redirectUri: "redirectUri"
      }
    }
  }
};
