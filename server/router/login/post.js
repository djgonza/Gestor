var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

	console.log('--> Login User..');

	// Campos incorrectos
	if(!req.body || !req.body.name || req.body.name == '' ||  !req.body.password || req.body.password == ''){
		console.log('--> Campos Incorrectos (401)');
		res.status(401).send("Campos Vacios");
		next();
		return;
	}

	//Comprovamos el usuario
	var userModel = require(__root + 'models/user');

	console.log('--> Comprovando Usuario..');

	userModel.findOne({ 'name': req.body.name }, 'name password', (err, user) => {
		
		if (err) {
			console.log('--> Error al buscar usuario (401)', err);
			res.status(401).send(err);
			return;
		}

		//Si no encuentra el usuario
		if(!user) {
			console.log('--> Campos incorrectos! (401)');
			res.status(401).send("Campos Incorrectos");
			return;
		}

		console.log('user', user);

		//Comparamos la contraseña
		var serializePassword = require(__root + 'middleware/SerializePassword');
		
		if(user.password != serializePassword(req.body.password)) {
			console.log('--> Contraseña Incorrecta (401)');
			es.status(401).send("Contraseña Incorrecta");
			return;
		}

		//Si es correcto
		//Borramos la contraseña
		delete user['password'];
		//Generamos el token

		console.log('--> Generando Token...');

		var tokenConfig = require(__root + 'tokenConfig');

		let token = jwt.sign({
			id: user._id
		}, tokenConfig.secret, { expiresIn: tokenConfig.expired });

		console.log('--> New Token ', token);

		console.log('--> Usuario Logueado (200)', token);

		//Eviamos el token con el id del usuario
		res.status(200).send(token);
		
	});

}