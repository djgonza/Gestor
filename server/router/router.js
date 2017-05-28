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

	console.log('--> Validate Token...');

	//Comprobamos que existe el token
	if (req.headers.token){
		jwt.verify(req.headers.token, tokenConfig.secret, (err, decoded) => {
			if(err){
				console.log('--> Token Expirado (409)');
				res.status(409).send("Token expirado!");
				return;
			}

			console.log('--> Token Correcto! (200)');
			res.status(200).send('ok');
			
		});
	}

});

router.post ('/login', require('./login/post'));

router.post ('/user', require('./user/post'));

/* Documents */
router.get 	  	('/book'		, checkToken, require('./document/get'));
router.post   	('/book'		, checkToken, require('./document/post'));
router.put 		('/book/:id'	, checkToken, require('./document/put'));
router.delete 	('/book/:id'	, checkToken, require('./document/delete'));
/* End Documents */

/* Fields */
router.get 		('/book/:id/fields'			, checkToken, require('./fields/get'));
router.post 	('/book/:id/field'			, checkToken, require('./fields/post'));
router.put 		('/book/:id/field/:index'	, checkToken, require('./fields/put'));
router.delete 	('/book/:id/field/:index'	, checkToken, require('./fields/delete'));
/* End Fields */

router.all('/*', (req, res) => { res.status(404).send('NotFound') });

module.exports = router;