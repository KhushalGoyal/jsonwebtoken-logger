const express = require( 'express' );
const bodyparser = require( 'body-parser' );
const cors = require( 'cors' );
const app =  express();
const morgan = require('morgan');
const winston = require('./config/winston');

app.use(bodyparser.json());
app.use(cors());

app.use(morgan('combined', { stream: winston.stream }));

const login = require('./modules/login');

app.use(login);

app.use((_req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });
  

module.exports = app;const port = process.env.PORT || 8000;
app.listen(port, ()=>{console.log(`Server is listening on port: ${port}`)});