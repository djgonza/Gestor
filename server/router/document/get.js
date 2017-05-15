module.exports = function (req, res, next) {

	var documentModel = require(__root + 'models/document');

	documentModel.find({
		user: req.user.id
	}, 'name fields', (err, documents) => {
		
		if(err) return res.status(500).send(err)

		res.status(200).send(documents);
		
	});
	
}