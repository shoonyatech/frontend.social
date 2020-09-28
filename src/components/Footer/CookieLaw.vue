<template>
  <b-row
    v-if="!userAcceptedCookiesYet"
    class="content"
  >
    <b-col md="12">
      <div>
        <div>
          We use cookies and other tracking technologies to improve the browsing
          experience on our website, to analyze our traffic and to provide
          social media functionalities.
        </div>
        <div>
          To find out more or to opt-out, please read
          <a
            name="privacy"
            href="/privacy"
            class="static-links"
            target="_blank"
            rel="noopener"
          >Privacy Policy</a>.
        </div>
        <div>
          By choosing I Accept you consent to our use of cookies and other
          tracking technologies.
        </div>
        <div class="buttons">
          <button @click="accept()">
            I Accept
          </button>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import userService from '@/services/user.service';

import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	props: {},
	data() {
		return {
			userAcceptedCookiesYet: true,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	created() {
		setTimeout(() => {
			//Check for if user is signedIn & cookieConsent

			var userSignedIn = this.$store.state.signedInUser;
			if (
				!userSignedIn ||
				(userSignedIn && !userSignedIn.userPreferences) ||
				(userSignedIn &&
					userSignedIn.userPreferences &&
					!userSignedIn.userPreferences.cookieConsent)
			) {
				this.userAcceptedCookiesYet =
					$cookies.get('cookies-accepted') === 'true' || false;
			}
		}, 10000);
	},
	methods: {
		decline() {
			alert(
				'We use cookies only if you sign in. If you do not sign in into this website, we will not create cookies for you. But we cannot guarantee cookie usage by third party tools. Please read Privacy Policy to find out which third party tools use cookies. If you are not comfortable that we use cookies, then please do not proceed further to use this website as it is not possible to run functionalities of this website without using cookies.'
			);
		},
		accept() {
			if (this.signedInUser) {
				var payload = {
					userPreferences: {
						cookieConsent: true,
					},
				};
				userService
					.udpateUserPreferences(payload)
					.then((res) => {
						if (res) {
							$cookies.set('cookies-accepted', true);
							this.userAcceptedCookiesYet = true;
							this.$store.commit('signInUser', res);
						}
					})
					.catch((e) => {
						eventBus.$emit('show-toast', {
							body: e.message,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			} else {
				$cookies.set('cookies-accepted', true);
				this.userAcceptedCookiesYet = true;
			}
		},
	},
};
</script>
<style scoped lang="scss">
.content {
	position: fixed;
	z-index: 10;
	bottom: 0px;
	margin: 10px;
	padding: 20px;
	background-color: darkolivegreen;
	color: white;
	font-size: 0.7rem;
}

.buttons {
	padding-top: 10px;
	text-align: right;
}

.error {
	margin-right: 20px;
}
</style>
