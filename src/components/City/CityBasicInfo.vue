<template>
	<!-- div for searching city -->
	<div class="basic-info">
		<img
			class="photo"
			:src="`/images/cities/${city.name}-${city.country}.jpg`"
			:alt="city.name"
			onerror="this.onerror=null; this.src='/images/cities/default.jpg'"
		/>
		<div class="details">
			<div class="inline-block">
				<span>{{ city.name }}</span>
				<span v-if="city.oldName"> ({{ city.oldName }})</span>,
				<span>{{ city.country }}</span>
			</div>
			<div class="text-sm title">
				{{ city.title }}
			</div>
			<div class="text-xs tiny-details">
				<tiny-key-value
					v-for="(skill, index) in city.topSkills"
					:key="index"
					:label="skill.skill"
					:value="skill.count"
					class="half-width pr-2"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import TinyKeyValue from '@/components/common/TinyKeyValue';

export default {
	components: {
		TinyKeyValue,
	},

	props: {
		city: { type: Object, required: true },
	},

	methods: {},
};
</script>

<style scoped lang="scss">
/* style for city basic-info */
.basic-info {
	border: solid #114273 2px;
	height: 12rem;
	width: 12rem;
	min-width: 12rem;
	color: #2c3e50;
	text-decoration: none;
}

.basic-info .photo {
	background-color: #114273;
	height: 5rem;
	width: 100%;
	min-height: 5rem;
	min-width: 100%;
	position: relative;
	object-fit: cover;

	&:before {
		content: ' ';
		display: inline-block;
		position: absolute;
		left: 0px;
		height: 5rem;
		width: 100%;
		background-color: #e6e6e6;
	}

	&:after {
		content: '\f127''  ' attr(alt);
		display: block;
		font-size: 16px;
		font-style: normal;
		font-family: FontAwesome;
		color: rgb(100, 100, 100);
		position: absolute;
		top: 30px;
		left: 0;
		width: 100%;
		text-align: center;
	}
}

.details {
	padding: 0.5rem;
	text-align: left;
}

.half-width {
	width: 50%;
}

.pr-2 {
	padding-right: 10px;
}

.title {
	margin-bottom: 10px;
}
</style>
