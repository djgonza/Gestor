var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users');

module.exports = mongoose.model('User', new Schema({

	name: {
		type: String,
		required: true
	},
	secondName:{
		type: String
	},
	password:{
		type: String,
		required: true,
		set: require('../middleware/SerializePassword')
	},
	email: {
		type: String,
		required: true
	},
	createdAt: { 
		type: Date, 
		default: Date.now,
	},
	role: {
		type: String,
		default: 'user'
	}

}));
