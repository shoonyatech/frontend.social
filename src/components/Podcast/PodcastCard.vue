<template>
  <!-- div for searching city -->

    <div class="thumbnail">
      <div class="details">
        <div class="inline-block">
          <h2 class="caption">
            <a :href="podcast.id">{{ podcast.title }}</a>
          </h2>
          <p class="ml-2">{{ podcast.description }}</p>
        </div>
        <div class="text-xs">
            <div
                v-if="podcast.rating"
                class="podcast-rating"
            >
                    <star-rating
                    :rtl="true"
                    :rating="podcast.rating"
                    :star-size="20"
                    :read-only="true"
                    :show-rating="false"
                    />
            </div>
        </div>
                <a
                  class="btn-apply"
                  :href="podcast.id"
                  target="_blank"
                >
                  <Button block label="Explore" />
                </a>
      </div>
    </div>

</template>

<script>
import StarRating from 'vue-star-rating';
import Button from '@/components/Buttons/Button';

export default {
	components: {
        StarRating,
        Button,
	},
	props: {
		podcast: { type: Object, required: true },
	},

	methods: {},
};
</script>

<style scoped lang="scss">
/* style for city thumbnail */
.thumbnail {
	border: solid var(--fs-primary-color) 2px;
	height: 12rem;
	width: 12rem;
	min-width: 12rem;
	color: var(--fs-primary-color);
	text-decoration: none;
}

.caption {
    margin: 0.75rem 0;
    text-align: center;
}

.thumbnail .photo {
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
	margin-top: -0.75rem;
	text-align: left;
}

.half-width {
	width: 50%;
}

.pr-2 {
	padding-right: 10px;
}
</style>
