const router = require('express').Router();
const { User } = require('../../db').models;


router.post('/signup', (req, res, next)=>{
  const { password } = req.body
  User.create(req.body)
    .then(user => {
      const credentials = { username: user.username, password }
      return User.authenticate(credentials)
    })
    .then(token => res.send(token))
    .catch(next)


})


module.exports = router;