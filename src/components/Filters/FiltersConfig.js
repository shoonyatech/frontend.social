const filtersSet = {
	beginner: {
		name: 'Beginner',
		id: 'beginner',
		selected: true,
		query: '&level=0',
		level: 0,
	},
	intermediate: {
		name: 'Intermediate',
		id: 'intermediate',
		selected: false,
		query: '&level=1',
		level: 1,
	},
	expert: {
		name: 'Expert',
		id: 'expert',
		selected: false,
		query: '&level=2',
		level: 2,
	},
};

export { filtersSet };
