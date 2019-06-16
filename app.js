const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Load User model
require('./models/user');
// passport config
require('./config/passport')(passport);

// Load routes
const auth = require('./routes/auth');

// load keys
const keys = require('./config/keys');

// Map global promise
mongoose.Promise = global.Promise;
// connect to mongoose
mongoose.connect(keys.mongoURI,
   { useNewUrlParser: true })
    .then(()=> console.log("MongoDB connected"))
    .catch((err)=> console.log(err));


// Cookie-parser
app.use(cookieParser());
app.use(session({
  secret:'sagar.c',
  resave:false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// set global vars
app.use((req,res,next)=>{
  res.locals.user = req.user || null;
  next();
})


app.get('/', (req,res) => {
  res.send('project started');
})

app.use('/auth', auth);




const port = process.env.PORT || 3000
app.listen(port , ()=>{
  console.log(`Started on ${port}`)
})