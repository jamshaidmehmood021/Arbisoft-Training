const { Router, Request, Response } = require('express');
const signup = require('../../controllers/auth/signup');
const login = require('../../controllers/auth/login');
const getUser = require('../../controllers/auth/getUser');
const authenticate = require('../../middleWare/authMiddleware');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.use(authenticate);
router.get('/user/:id', getUser);

module.exports = router;
