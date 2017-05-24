var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Page', new Schema({

	fields: {
		type: Array,
		default: []
	}

}));