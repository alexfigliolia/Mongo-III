const mongoose = require('mongoose');
const User = require('../models/userModels');

const SUE = 422;

let currentUser = null;

const createUser = (req, res) => {
	const { username, password } = req.body;
	const newUser = new User({ username, password });
	newUser.save((err, user) => {
		if(err) {
			res.status(SUE).json({'something went wrong': err});
			return;
		}
		currentUser = user;
		res.status(200).json(user);
	});
};

const login = (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username, password }, (err, user) => {
		if(err) {
			res.status(SUE).json({'something went wrong': err});
			return;
		}
		currentUser = user;
		res.status(200).json(user);
	})
};

module.exports = {
	currentUser,
	createUser,
	login
}
