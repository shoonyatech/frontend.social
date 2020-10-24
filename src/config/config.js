import keys from './keys';

export default {
	api: process.env.VUE_APP_API_URL || 'http://localhost:3000',
	auth: {
		facebook: {
			clientId: keys.facebook.clientId,
			clientSecret: keys.facebook.clientSecret,
		},
		github: {
			clientId: keys.github.clientId,
			clientSecret: keys.github.clientSecret,
		},
		twitter: {
			clientId: keys.twitter.clientId,
			clientSecret: keys.twitter.clientSecret,
		},
		google: {
			clientId: keys.google.clientId,
			clientSecret: keys.google.clientSecret,
		},
		bitbucket: {
			clientId: '',
			clientSecret: '',
		},
		linkedin: {
			clientId: '',
			clientSecret: '',
		},
	},
	cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || 'tlfd2hsy',
	cloudinaryUrl:
		process.env.CLOUDINARY_BASE_URL ||
		'https://api.cloudinary.com/v1_1/dfsq4jnnq/upload',
};
