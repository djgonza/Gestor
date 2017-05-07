var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Document', new Schema({

	user: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: Number,
		required: true
	},
	createdAt: { 
		type: Date, 
		default: Date.now,
	}

}));