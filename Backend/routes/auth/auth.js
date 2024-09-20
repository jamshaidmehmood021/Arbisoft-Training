const { Router, Request, Response } = require('express');
const signup = require('../../controllers/auth/signup');
const login = require('../../controllers/auth/login');
const getUser = require('../../controllers/auth/getUser');
const authenticate = require('../../middleWare/authMiddleware');
const createGig = require('../../controllers/gig/createGig');
const getAllGigs = require('../../controllers/gig/getAllGigs');
const getGigsByUserId = require('../../controllers/gig/getUserGigs');
const deleteGig = require('../../controllers/gig/deleteGig');
const updateGig = require('../../controllers/gig/updateGig');
const sendMessage = require('../../controllers/message/sendMessage');
const getMessages = require('../../controllers/message/getMessages');
const getConversationsByGig = require('../../controllers/conversations/getConversations');

const upload = require('../../middleWare/multer');

const router = Router();

router.post('/signup', upload.single('profilePicture'), signup);
router.post('/login', login);
router.use(authenticate);
router.get('/user/:id', getUser);
router.post('/createGig', upload.fields([{ name: 'image' }, { name: 'video' }]), createGig);
router.get('/getAllGigs', getAllGigs);
router.get('/getUserGigs/:userId', getGigsByUserId);
router.delete('/deleteGig/:id', deleteGig); 
router.post('/updateGig/:id', upload.fields([{ name: 'image' }, { name: 'video' }]), updateGig); 
router.post('/sendMessage', sendMessage);
router.get('/messages/:conversationId', getMessages);
router.get('/conversations/:gigId', getConversationsByGig);

module.exports = router;
