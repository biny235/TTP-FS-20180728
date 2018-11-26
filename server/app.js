const express = require('express');
const path = require('path')
const app = express();

try{
  const config = require('../config.json');
  process.env = Object.assign(process.env, config);
}catch(e){
  process.env.SECRET = 'secret'
  console.log(e.message);
}



const db = require('./db');



app.use(require('body-parser').json())

db.syncAndSeed()
  .then(()=> console.log('seeded'))

app.use('/', require('./routes'))
app.use('/', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res, next) => {

  res.sendFile(path.join(__dirname, '../dist/index.html'))

})


app.use((err, req, res, next) => {
  const message = err.errors && err.errors[0].message;
  err.message = message || err.message;
  console.log(err.message)
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;