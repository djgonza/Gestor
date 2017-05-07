module.exports = function (req, res, next) {

	var documentModel = require(__root + 'models/document');

	documentModel.findById(req.body.id, (err, doc) => {
		
		if (err) return res.status(500).send(err);

		if(req.body.id) doc.name = req.body.id;
		if(req.body.type) doc.type = req.body.type;

		doc.save((err, updateDoc) => {

			if (err) return res.status(500).send(err);

			res.status(200).send(updateDoc);

		});

	});
	
}