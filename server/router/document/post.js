module.exports = function (req, res, next) {

	var documentModel = require(__root + 'models/document');
	documentModel.create(Object.assign(req.body, {user: req.user.id}), (err, documento) => {

		if(err) return res.status(500).send(err);

		res.status(200).send(documento);

	});


	
}