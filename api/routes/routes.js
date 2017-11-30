const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');
const commentControllers = require('../controllers/commentControllers');

module.exports = (app) => {
  app.route('/new-user').post(userControllers.createUser);

  app.route('/login').post(userControllers.login);

  app.route('/posts/:id/comments').post(commentControllers.addComment);

  app.route('/new-post').post(postControllers.createPost);

  app.route('/posts').get(postControllers.getPosts);

  app.route('/posts/:id')
  	.get(postControllers.getPost)
  	.post(postControllers.updatePost);
};
