const express = require( 'express' );
const bodyparser = require( 'body-parser' );
const cors = require( 'cors' );
const app =  express();
const morgan = require('morgan');
const winston = require('./config/winston');
const mongoose = require('mongoose');



app.use(bodyparser.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const db = mongoose.connection;

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function (err, names) {
      console.log(names); // [{ name: 'dbname.myCollection' }]
      module.exports.Collection = names;
  });
})

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
  

module.exports = app;const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Server is listening on port: ${port}`)});