var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var checkToken = require('./../middleware/checkToken');

//Access-Control-Allow-Origin permision
router.use(cors({
	origin: ['http://localhost:3000'],
	credentials: true
}));

//Parseador de peticiones
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/validateToken', (req, res, next) => {

	var tokenConfig = require(__root + 'tokenConfig');

	//Comprobamos que existe el token
	if (req.headers.token){
		jwt.verify(req.headers.token, tokenConfig.secret, (err, decoded) => {
			if(err){
				res.status(409).send("Token expirado!");
				next();
			}

			res.status(200).send('ok');
			
		});
	}

});

router.post ('/login', require('./login/post'));

router.post ('/user', require('./user/post'));

/* Documents */
router.get 	  	('/documents/names'	, checkToken, require('./document/getNames'));
router.get 	  	('/documents'		, checkToken, require('./document/get'));
router.post   	('/documents'		, checkToken, require('./document/post'));
router.put 		('/documents/:id'	, checkToken, require('./document/put'));
router.delete 	('/documents/:id'	, checkToken, require('./document/delete'));
/* End Documents */

/* Fields */
router.get 		('/document/:id/fields'			, checkToken, require('./fields/get'));
router.post 	('/document/:id/field'			, checkToken, require('./fields/post'));
router.put 		('/document/:id/field/:index'	, checkToken, require('./fields/put'));
router.delete 	('/document/:id/field/:index'	, checkToken, require('./fields/delete'));
/* End Fields */

router.all('/*', (req, res) => { res.status(404).send('NotFound') });

module.exports = router;