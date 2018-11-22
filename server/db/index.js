const conn = require('./conn');
const User = require('./models/User');
const Transaction = require('./models/Transaction');


User.hasMany(Transaction)
Transaction.belongsTo(User)


const syncAndSeed = ()=>{
  return conn.sync({force: true})
    .then(() => User.create({
      email: 'test@test.com',
      password: 'password',
      firstName: 'test',
      lastName: 'test'
    }))
}

module.exports = {
  syncAndSeed,
  models: {
    User,
    Transaction
  }
}
