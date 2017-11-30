const mongoose = require('mongoose');
const Post = require('../models/postModels');
const User = require('../models/userModels');
const currentUser = require('./userControllers').currentUser;

const SUE = 422;

console.log(currentUser);

const createPost = (req, res) => {
	const { title, content } = req.body;
	console.log(currentUser);
	if(currentUser === null) {
		res.status(SUE).json({'something went wrong': 'you must be logged in to create posts'});
		return;
	}
	const newPost = new Post({ title, content, author: currentUser._id });
	newPost.save((err, post) => {
		if(err) {
			res.status(SUE).json({'something went wrong': err});
			return;
		}
		res.status(200).json(post);
	});
}

const getPosts = (req, res) => {
	Post.find({}).populate('comments').exec((err, posts) => {
		if(err) {
			res.status(SUE).json({'something went wrong': err});
			return;
		}
		res.status(200).json(posts);
	});
}

const getPost = (req, res) => {
	const { id } = req.params;
	Post.findOne({ _id: id }, (err, post) => {
		if(err) {
			res.status(SUE).json({'something went wrong': err});
			return;
		}
		res.status(200).json(post);
	});
}

const updatePost = (req, res) => {
	const { id } = req.params;
	const { content } = req.body;
	Post.findOneAndUpdate({ _id: id }, { content }, (err, post) => {
		if(err) {
			res.status(SUE).json({'something went wrong': err});
			return;
		}
		res.status(200).json(post);
	}); 
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost
};