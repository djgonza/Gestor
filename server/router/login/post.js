var jwt = require('jsonwebtoken');

module.exports = function (req, res) {

	// Campos incorrectos
	if(!req.body || !req.body.name || req.body.name == '' ||  !req.body.password || req.body.password == ''){
		res.send(JSON.stringify({err: "Campos Vacios"}));
		return;
	}

	//Comprovamos el usuario
	var userModel = require(__root + 'models/user');

	userModel.findOne({ 'name': req.body.name }, 'name password', function (err, user) {
		
		if (err) return handleError(err);

		//Si no encuentra el usuario
		if(!user) {
			res.send(JSON.stringify({err: "Campos Incorrectos"}));
			return;
		}

		//Comparamos la contraseña
		var serializePassword = require(__root + 'middleware/SerializePassword');
		
		if(user.password != serializePassword(req.body.password)) {
			res.send(JSON.stringify({err: "Contraseña Incorrecta"}));
			return;
		}

		//Si es correcto
		//Borramos la contraseña
		delete user['password'];
		//Generamos el token

		var tokenConfig = require(__root + 'tokenConfig');

		let token = jwt.sign({
			id: user._id
		}, tokenConfig.secret, { expiresIn: tokenConfig.expired });

		//Eviamos el token con el id del usuario
		res.send(token);
		
	});

}