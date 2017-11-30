const mongoose = require('mongoose');
const Post = require('../models/postModels');
const User = require('../models/userModels');
const Comment = require('../models/commentModels');
const currentUser = require('./userControllers').currentUser;

const SUE = 422;

const addComment = (req, res) => {
	const id = req.params.id;
	const { content } = req.body;
	if(currentUser === null) {
		res.status(SUE).json({'something went wrong': 'Cannot comment unlessed logged in'});
		return
	}
	const c = new Comment({ content: content, author: currentUser._id, parentPost: id});
	c.save((err, com) => {
		if(err) {
			res.status(SUE).json({'something went wrong': err});
			return;
		}
		res.status(200).json(com);
	});
} 

module.exports = {
	addComment
};
