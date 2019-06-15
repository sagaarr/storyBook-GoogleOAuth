const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// passport config
require('./config/passport')(passport);
const app = express();
// Load routes
const auth = require('./routes/auth');

app.get('/', (req,res) => {
  res.send('project started');
})

app.use('/auth', auth);


const port = process.env.PORT || 3000
app.listen(port , ()=>{
  console.log(`Started on ${port}`)
})