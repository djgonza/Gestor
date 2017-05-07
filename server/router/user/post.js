module.exports = function (req, res, next) {

	//Parseamos los datos del form
	var dataForm = {
		name: req.body.username,
		secondName: req.body.secondName,
		password: req.body.password,
		email: req.body.email
	}

	//Creamos el usuario
	var userModel = require(__root + 'models/user');

	userModel.create(req.body, (err) => {

		if(err) {
			console.log(err);
			res.sendStatus(409);
			return;
		}

		res.sendStatus(200);

	});

}