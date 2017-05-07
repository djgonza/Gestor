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

//Rutas
router.get('/validateToken', (req, res, next) => {

	var tokenConfig = require(__root + 'tokenConfig');

	//Comprobamos que existe el token
	if (req.headers.token){
		jwt.verify(req.headers.token, tokenConfig.secret, (err, decoded) => {
			if(err){
				res.send(JSON.stringify({status: 409, message: "Token expirado!"}));
				return;
			}
			//Ok
			res.send({status: 200});
			return;
		});
	}
	next();

});
router.post ('/login', require('./login/post'));

router.post ('/user', require('./user/post'));

router.post 	('/document', checkToken, require('./document/post'));
router.get 		('/document', checkToken, require('./document/get'));
router.delete 	('/document', checkToken, require('./document/delete'));

module.exports = router;