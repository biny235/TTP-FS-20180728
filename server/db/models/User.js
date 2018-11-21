const conn = require('../conn');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const secret = process.env.SECRET;

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.DECIMAL,
    defaultValue: 5000
  }
});

User.beforeCreate((user) => {
  return bcrypt.genSalt()
    .then(salt => {
      return bcrypt.hash(user.password, salt)
    })
    .then(hash => {
      user.password = hash;
    })
    .catch(err => { 
        throw new Error(err); 
    });
})

User.prototype.validatePassword = function (password){
  return bcrypt.compareSync(password, this.password)
}

User.authenticate = function (user){
  const { email, password } = user;
  return this.findOne({ where: {email} })
    .then(user => {
      if(!user.validatePassword(password)) throw {status: 401, message: 'Invalid Password'}
      return jwt.encode({id: user.id}, secret)
    })
}

User.exchangeToken = function(token){
  try{
    const id = jwt.decode(token, secret).id
    return this.findByPk(id, {
      include: [{model: conn.models.transaction}],
      attributes: {exclude: ['password']}
    })
    .then(user => {
      if(user) return user
      throw "error"
    })
  }
  catch(e){
    return Promise.reject({ status: 401 })
  }
}


module.exports = User