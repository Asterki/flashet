import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
	userID: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Number,
		required: true,
	},

	username: {
		type: String,
		required: true,
		unique: true,
	},

	email: {
		value: {
			type: String,
			required: true,
			unique: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verifiedAt: {
			type: Number,
			default: null,
		},
	},

	preferences: {
		locale: {
			type: String,
			default: 'en',
		},
		theme: {
			type: String,
			default: 'dark',
		},
	},

	password: {
		type: String,
		required: true,
	},

	banned: {
		type: Boolean,
		default: false,
	},
});

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User, 'users');