import eventBus from '../../utilities/eventBus';
import { ToastType } from '../../constants/constants';

export default {
	name: 'ToastsManager',
	render() {
		return '';
	},
	mounted() {
		eventBus.$on('show-toast', this.showToast);
	},
	beforeDestroy() {
		eventBus.$off('show-toast', this.showToast);
	},
	methods: {
		showToast({ type = ToastType.SUCCESS, title = '', body = '' }) {
			this.$bvToast.toast(body, {
				title,
				variant: type,
				autoHideDelay: 5000,
			});
		},
	},
};
