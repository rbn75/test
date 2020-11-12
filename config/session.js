const session=require('express-session');
const MongoStore =require('connect-mongo')(session)
const mongoose=require('mongoose')


module.exports=app=>{
  app.use(
    session({
      secret:'qwerty',
      store:new MongoStore({mongooseConnection:mongoose.connection}),
      resave:true,
      saveUninitialized:true,
    })
  )
}