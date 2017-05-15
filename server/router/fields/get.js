module.exports = function (req, res, next) {

	var documentModel = require(__root + 'models/document');

	documentModel.findOne({
		_id: req.params.id
	}, 'fields', (err, fields) => {

		if(err) return res.status(500).send(err)

		res.status(200).send(fields);
		
	});
	
}