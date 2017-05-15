module.exports = function (req, res, next) {

	var documentModel = require(__root + 'models/document');

	documentModel.findOne({
		_id: req.params.id
	}, 'fields', (err, doc) => {

		if(err) return res.status(500).send(err)

		doc.fields[req.params.index] = req.body;
		doc.markModified('fields');

		doc.save((err, newDoc) => {

			if(err) return res.status(500).send(err)

			res.status(200).send(newDoc.fields);

		});
		
	});
	
}