module.exports = function (req, res, next) {

	var documentModel = require(__root + 'models/document');

	documentModel.findByIdAndRemove(req.body.id, (err) => {
		
		if (err) return res.status(500).send(err);

		res.status(200).send('ok');

	});
	
}