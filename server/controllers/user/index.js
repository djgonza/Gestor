var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var userModel = new (require('./model'));

router.delete ('/remove/:name', function (req, res, next) {

	//Si no hay parametro nombre
	if(!req.params.name){
		res.sendStatus(409);
	}

	//Borramos el usuario por nombre
	userModel.remove(req.params.name, function (err) {
		if(err) {
			res.sendStatus(409);
			return;
		}
		res.sendStatus(200);
	});
	
});

router.post ('/create', function (req, res, next) {
	
	//Parseamos los datos del form
	var dataForm = {
		name: req.body.username,
		password: req.body.password,
		email: req.body.email
	}
	//Creamos el usuario
	userModel.create(dataForm, function (err) {
		if(err) {
			console.log(err);
			res.sendStatus(409);
			return;
		}
		res.sendStatus(200);
	});

});

router.put ('/update', function (req, res, next) {

	//Actualizamos el usuario
	userModel.update(req.body, function (err) {
		if(err) {
			console.log(err);
			res.sendStatus(409);
			return;
		}
		res.sendStatus(200);
	});

});

module.exports = router;