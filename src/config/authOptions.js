import config from "./config";

export function getCookieDomainUrl() {
  try {
    return window.location.hostname;
  } catch (e) { }

  return "";
}

export function getRedirectUri(uri) {
  try {
    return uri != null
      ? `${window.location.origin}${uri}`
      : window.location.origin;
  } catch (e) { }

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
      url: "/auth/facebook?referrer=" + getParameterByName("referrer"),
      authorizationEndpoint: "https://www.facebook.com/v5.0/dialog/oauth",
      redirectUri: getRedirectUri("/signin/callback"),
      requiredUrlParams: ["display", "scope"],
      scope: ["email"],
      scopeDelimiter: ",",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 580, height: 400 },
      clientId: config.auth.facebook.clientId
    },

    github: {
      name: "github",
      url: "/auth/github?referrer=" + getParameterByName("referrer"),
      authorizationEndpoint: "https://github.com/login/oauth/authorize",
      redirectUri: getRedirectUri("/signin/callback"),
      optionalUrlParams: ["scope"],
      scope: ["user:email"],
      scopeDelimiter: " ",
      oauthType: "2.0",
      popupOptions: { width: 1020, height: 618 },
      clientId: config.auth.github.clientId
    },

    twitter: {
      name: "twitter",
      url: "/auth/twitter?referrer=" + getParameterByName("referrer"),
      authorizationEndpoint: "https://api.twitter.com/oauth/authenticate",
      redirectUri: getRedirectUri("/signin/callback"),
      oauthType: "1.0",
      popupOptions: { width: 495, height: 645 },
      clientId: config.auth.twitter.clientId
    },

    google: {
      name: "google",
      url: "/auth/google?referrer=" + getParameterByName("referrer"),
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      redirectUri: getRedirectUri("/signin/callback"),
      requiredUrlParams: ["scope"],
      optionalUrlParams: ["display"],
      scope: ["profile", "email"],
      scopePrefix: "openid",
      scopeDelimiter: " ",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 452, height: 633 },
      clientId: config.auth.google.clientId
    },

    bitbucket: {
      name: "bitbucket",
      url: "/auth/bitbucket?referrer=" + getParameterByName("referrer"),
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
      url: "/auth/linkedin?referrer=" + getParameterByName("referrer"),
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

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
