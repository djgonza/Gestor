var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

	var tokenConfig = require(__root + 'tokenConfig');

	//Comprobamos que existe el token
	if (req.headers.token){
		jwt.verify(req.headers.token, tokenConfig.secret, (err, decoded) => {
			if(err){
				console.log('token error', err);
				res.send(JSON.stringify({status: 409, message: "Token expirado!"}));
				return;
			}
			//Guardamos el identificador del usuario
			req.user = {id: decoded.id};
			next();
		});
	}

}