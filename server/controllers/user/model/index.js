class User {

	constructor() {

		this.mongoose = require('mongoose');
		this.model = require('./model');

	}

	/*
	-- Devuelve un objeto usuario
	-- @param:
	-- 		name: Usuario a buscar
	--		fields: Campos a devolver del usuario
	-- 		cb: callback
	-- @return: promise
	*/
	findByName (name, fields){

		var query = {'name': name};

		return this.model.findOne(query, fields, function (err, user) { 

			if(err){
				return (err);
			}

		});

	}

	/*
	-- Crea un usuario en la db
	-- @param: 
	--		user: Objeto usuario
	*/
	create (newUser, cb) {

		var self = this;

		//Comprobamos si el usuario existe
		self.findByName(newUser.name, '_id').catch(function(err){
			cb({error: err});
		}).then(function (userDb) {
			
			//Si existe devolvemos el error
			if(userDb) {
				cb({error: 'Usuario ya registrado'});
				return (err);
			}

			//Guardamos el usuario
			self.save(newUser).catch(function(err){
				console.log('error save');
				cb({error: err});
			}).then(function (err) {
				if(err) {
					cb({error: 'Error al guardar usuario'});
					return (err);
				}
				cb(null, {status: true});
			});

		});

	}

	/*
	-- Guarda el usuario en la db
	-- @param: 
	--		user: Objeto usuario
	-- @return: promise
	*/
	save (user) {

		//Creamos el nuevo usuario
		var newUser = new this.model(user);

		//Guardamos el nuevo usuario
		return newUser.save(function (err) { 
			if(err) { 
				console.log('Save err', err);
				return (err);
			}
		});

	}

	/*
	-- Actualizamos el usuario en la db
	-- @param: 
	--		user: Objeto usuario con nuevos datos
	*/
	update (user, cb) {

		var self = this;

		self.findByName(user.name).catch(function(err){
			cb({error: err});
			return (err);
		}).then(function (userDb) {

			//sobreescribimos los campos
			if (user.password) userDb.password = user.password;
			if (user.email) userDb.email = user.email;
			if (user.role) userDb.role = user.role;
			
			//Actualizamos el usuario
			self.save(userDb).catch(function(err){
				console.log('error save');
				cb({error: err});
			}).then(function (err) {
				if(err) {
					cb({error: 'Error al guardar usuario'});
					return (err);
				}
				cb(null, {status: true});
			});

		});

	}

	remove (name, cb) {

		var self = this;

		self.findByName(name).catch(function(err){
			cb({error: err});
			return (err);
		}).then(function (userDb) {
			userDb.remove(function (err) {
				if (err) {
					return (err);
					cb({error: "Error al borrar ususario"});
				}
				cb(null, {status: true});
			});
		});

	}

}

module.exports = User;