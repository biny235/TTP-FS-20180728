const router = require('express').Router();
const { User } = require('../../db').models;


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
  console.log(req.headers.token)
  User.exchangeToken(req.headers.token)
    .then(user => res.send(user))
    .catch(next)
})

router.get('/stocks', (req, res, next) => {
  // will return all stocks owned by user
  res.send('')
})

router.get('/transaction', (req, res, next) => {
  // will return all user transactions

})


module.exports = router;