var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Library', new Schema({

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
	books: {
		type: Array,
		default: []
	}

}));