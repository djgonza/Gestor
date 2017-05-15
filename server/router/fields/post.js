module.exports = function (req, res, next) {

	console.log(req.body);

	var documentModel = require(__root + 'models/document');
	documentModel.findOne({
		_id: req.params.id
	}, 'fields', (err, doc) => {

		if(err) return res.status(500).send(err)

		doc.fields.push(req.body);

		doc.save((err, newDoc) => {

			if(err) return res.status(500).send(err)

			res.status(200).send(newDoc.fields);
		
		});
		
	});


	
}