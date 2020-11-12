const express = require('express');
const router  = express.Router();
const {signupView, signupProcess, loginView,loginProcess, 
  privatePi,logout,googleInit, googleCb,}=require('../controllers/auth')
// const passport=require('../config/passport')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// ------------routes here---------
router.get('/signup', signupView)
router.get('/signup', signupProcess)
router.get('/login',loginView)
router.post('/login', loginProcess)



// router.post('/login', passport.authenticate('local', {
//   successRedirect:'/',
//   failureRedirect:'/login',
// }))

router.get('/private-page', privatePi)

router.get('/logout', logout)
module.exports = router;

//auth with google

router.get('/auth/google', googleInit)
router.get('/auth/google/callback', googleCb)