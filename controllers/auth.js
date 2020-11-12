const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('../config/passport')

exports.signupView = (req, res) => res.render('auth/signup');


exports.signupProcess = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.render('auth/signup', {
      errorMessage: 'Indicate email and password'
    })
  }
  const user = await User.findOne({ email })
  if (user) {
    return res.render('auth/signup', {
      errorMessage: 'error'
    })
  }
  const salt = bcrypt.genSaltSync(12)
  const hasPass = bcrypt.hashSync(password, salt)
  await User.create({
    email,
    password: hasPass,
  })
  res.redirect('/login')

}

exports.loginView = (req, res) => {
  res.render('auth/login',{errorMessage: req.flash('error')})
}
exports.loginProcess = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash:true,
});

// exports.privatePi=(req, res)=> res.render('private')

exports.privatePi=(req, res)=>{
  if(!req.user) return res.redirect('/')
  res.render('private')
}

exports.logout=(req, res)=>{
  req.logout()
  res.redirect('/login')
}

exports.private=(req, res)=>res.render('private')

exports.googleInit=passport.authenticate('google', {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})
exports.googleCb= passport.authenticate('google', {
  successRedirect: '/private',
  failureRedirect: '/login',
})
