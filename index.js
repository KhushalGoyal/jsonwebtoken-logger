const express = require( 'express' );
const bodyparser = require( 'body-parser' );
const cors = require( 'cors' );
const app =  express();
const morgan = require('morgan');
const winston = require('./config/winston');
const login = require('./modules/login');
const blogPost = require('./modules/addBlogPost');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true})
  .then(result => { console.log('Connected to mongodb')})
  .catch(err => { throw err });

app.use(bodyparser.json());
app.use(cors());
app.use(morgan('combined', { stream: winston.stream }));
app.use(login);
app.use(blogPost);
app.use((_req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});
  

app.get('*', (req,res) => { 
  res.sendFile(path.resolve('dist/index.html')); 
});
module.exports = app;const port = process.env.PORT || 8000;
app.listen(port, ()=>{console.log(`Server is listening on port: ${port}`)});