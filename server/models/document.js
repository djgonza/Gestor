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
	createdAt: { 
		type: Date, 
		default: Date.now,
	},
	fields: {
		type: Array
	}

}));