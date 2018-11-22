const { User } = require('../db').models

const auth = (req, res, next) => {
  const { token } = req.headers
  if(!token) {
    next({ status: 401 });
  }
  User.exchangeToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
}

const checkUser = (req, res, next) => {
  if(!req.user) next({status: 401, errors: [{message: "Unauthorized"}]});
  next()
}

module.exports = {
  auth,
  checkUser
};
