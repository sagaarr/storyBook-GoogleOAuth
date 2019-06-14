const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req,res) => {
  res.send('project started');
})

const port = process.env.PORT || 3000
app.listen(port , ()=>{
  console.log(`Started on ${port}`)
})