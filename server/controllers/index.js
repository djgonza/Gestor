var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var router = express.Router();
var upload = multer();

//Parsear el contenido de las rutas a json
router.use(upload.array());

router.use(express.static('public'));

router.get('/', function (req, res, next) {
	res.sendFile(__public + 'index.html');
});

router.get ('/login', function (req, res, next) {
	console.log('/login get ->');
	res.header('Access-Control-Allow-Origin', 'localhost');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.sendFile(__public + 'index.html');
});

router.post ('/login', function (req, res, next) {

	console.log("/login ->", req.body);

	//si ya existe la session
	if (res.session && res.session.user){
		res.sendStatus(200);
		return;
	}

	// Campos incorrectos
	if(!req.body || !req.body.username || !req.body.password){
		res.sendStatus(409);
		return;
	}

	var userModel = new (require('./user/model'));

	userModel.findByName(req.body.username, 'name password role').then(function (user) {
		
		//Si no encuentra el usuario
		if(!user) {
			res.sendStatus(409);
			return;
		}

		//Comparamos la contraseña
		var serializePassword = require('./user/middleware/SerializePassword');
		console.log('password ->', user.password, serializePassword(req.body.password));
		if(user.password != serializePassword(req.body.password)) {
			res.sendStatus(409);
			return;
		}

		//Si es correcto
		//Borramos la contraseña
		delete user.password;
		//Guardamos los datos en la session
		res.session.user = user;

		res.sendStatus(200);

	});

});

router.get ('/logout', function (req, res, next) {
	if(req.session){
		req.session.destroy();
	};
	res.redirect('/');
});

router.use('/user', require('./user'));

module.exports = router;