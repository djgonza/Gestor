var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let schema = new Schema({

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
		set: require(__root + 'middleware/SerializePassword')
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

}, {emitIndexErrors: true})

schema.post('save', (err, doc, next) => {
	
	if(err.name === 'ValidationError'){
		next(new Error('Validacion Fallida'));
		return;
	}
	next(err);
});

module.exports = mongoose.model('User', schema);