<template>
  <div>
    <table class="text">
      <td>
        <img
          :src="user.profilePic"
          class="profile-photo"
          alt="Profile Pic"
        >
      </td>
      <td class="td">
        {{ user.name }}
      </td>
      <td class="td">
        {{ user.city }},{{ user.country }}
      </td>
    </table>
  </div>
</template>
<script>
export default {
	name: 'UserActivityStrip',
	props: {
		user: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
};
</script>
<style>
.td {
	width: 50%;
}
.text {
	color: black;
}
.profile-photo {
	height: 50px;
	width: 50px;
	background-color: #114273;
	text-align: left;
	padding: 2px;
	border-radius: 999px;
}
</style>
