var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Book', new Schema({

	fields: {
		type: Array,
		default: []
	},
	pages: {
		type: Array,
		default: []
	}

}));