<template>
  <div>
    <div class="avatar">
      <div v-if="user && user.isGuest">
        <img
          :src="'/images/avatar.svg'"
          class="profile-photo"
          alt="Profile Pic"
        ><br>
      </div>
      <a
        v-else
        :href="`/user/${user.username}`"
        :title="user.username"
      >
        <img
          :src="user.profilePic || '/images/avatar.svg'"
          class="profile-photo"
          alt="Profile Pic"
        ><br>
      </a>
    </div>
    <div v-if="showName == true">
      <h2 class="name">
        {{ user.name }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
	components: {},

	props: {
		user: { type: Object, required: true },
		showName: { type: Boolean, default: false },
	},

	methods: {},
};
</script>

<style scoped lang="scss">
.avatar {
	background-color: #114273;
	border-radius: 50%;
	margin-right: 10px;
	width: 50px;
	height: 50px;
	overflow: hidden;
	margin-bottom: 5px;
}

.profile-photo {
	height: 50px;
	width: 50px;
	background-color: #114273;
	text-align: left;
	padding: 2px;
	border-radius: 999px;
}
.name {
	color: black;
}
</style>
