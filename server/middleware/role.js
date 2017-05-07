/*
-- Comprueba el role del usuario, 
-- para permitir o denagar acceso
-- Roles: ['admin', 'user']
*/

module.exports = function (role) {

	return function (req, res, next) {

		console.log('role -> ', role, req.session.user.role);

		if(!req.session.user || req.session.user.role != role) {
			console.log('role fail!');
			res.sendStatus(401);
			res.end();
			return;
		}

		next();

	}
	
};