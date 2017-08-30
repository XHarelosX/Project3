var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs'); //library for hashing the password
var urlValidator = require('../validators/urlValidator').urlValidator;

 
const videoSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String, minlength: 3, required: true },
	category: { type: String, required: true },
	url: { type: String, minlength: 6, required: true },
});

// Mongoose user schema 
const UserSchema = new mongoose.Schema({ 
	
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	videos: [videoSchema]
});


module.exports = {
	Video: mongoose.model('Video', videoSchema),
	User: mongoose.model('User', UserSchema),
	createUser: function (newUser, callback) {
		bcryptjs.genSalt(10, function (err, salt) { // bcryptjs functions for hashing pass 
			bcryptjs.hash(newUser.password, salt, function (err, hash) {
				newUser.password = hash;
				if (err) {
					console.log(err)
				} else {
					console.log({
						newUser
					});
					newUser.save(callback);
				}
				// Mongoose save function for Save data in database 
			});
		});
	},
};