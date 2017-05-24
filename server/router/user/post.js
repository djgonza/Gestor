module.exports = function (req, res, next) {

	//Creamos el usuario
	let userModel = require(__root + 'models/user');
	
	userModel.findOne({ 'name': req.body.name }, '', (err, user) => {

		if(user) {
			console.log('--> Creacion de usuario fallida: Usuario duplicado', err);
			res.status(401).send('Campos Incorrectos!');
			return;
		}

		userModel.create(req.body).then(user => {

			console.log('--> Usuario Creado! ', user);
			res.sendStatus(200);
			return;

		}).catch(err => {

			console.log('--> Creacion de usuario fallida', err);
			res.status(401).send('Campos Incorrectos!');
			return;

		});

	});

}