const { Router, Request, Response } = require('express');
const signup = require('../../controllers/auth/signup');
const login = require('../../controllers/auth/login');
const addPost = require('../../controllers/post/addPost');
const getPosts = require('../../controllers/post/getPosts');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/addPost', addPost);
router.post('/getPosts', getPosts);

module.exports = router;
