const router = require('express').Router();
const { User, Transaction } = require('../../db').models;
const { auth } = require('../auth');

router.post('/signup', (req, res, next) => {
  const { password } = req.body
  User.create(req.body)
    .then(user => {
      const credentials = { email: user.email, password }
      return User.authenticate(credentials)
    })
    .then(token => res.send(token))
    .catch(next)
})

router.post('/login', (req, res, next) => {

  User.authenticate(req.body.user)
    .then(token => res.send(token))
    .catch(next)

})

router.get('/', (req, res, next)=>{
  User.exchangeToken(req.headers.token)
    .then(user => res.send(user))
    .catch(next)
})

router.get('/stocks', auth, (req, res, next) => {
  // will return all stocks owned by user
  res.send('')
})

router.get('/transactions', auth, (req, res, next) => {
  // will return all user transactions
  req.user.getTransactions()
    .then(transactions => res.send(transactions))
    .catch(next)
  
})


module.exports = router;