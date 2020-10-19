<template>
    <div class="card">
      <div class="details">
        <div class="inline-block">
          <h2 class="caption">
            <a :href="podcast.id">{{ podcast.title }}</a>
          </h2>
          <p class="ml-2 text-left">{{ podcast.description }}</p>
        </div>
        <div class="text-xs">
            <div

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
.card {
	border: solid var(--fs-primary-color) 2px;
	height: 18rem;
	width: 12rem;
	min-width: 12rem;
	color: var(--fs-primary-color);
	text-decoration: none;
}

.caption {
    margin: 0.75rem 0;
    text-align: center;
}

.details {
	padding: 0.5rem;
	margin-top: -0.75rem;
}

.half-width {
	width: 50%;
}

.pr-2 {
	padding-right: 10px;
}

.btn-apply button {
	margin-top: 0.8rem;
}
</style>
