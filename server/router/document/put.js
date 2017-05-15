module.exports = function (req, res, next) {

	var documentModel = require(__root + 'models/document');

	documentModel.findById(req.params.id, (err, doc) => {
		
		if (err) return res.status(500).send(err);

		if(req.body.name) doc.name = req.body.name;

		doc.save((err, updateDoc) => {

			if (err) return res.status(500).send(err);

			res.status(200).send(updateDoc);

		});

	});
	
}