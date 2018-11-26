const conn = require('./conn');
const User = require('./models/User');
const Transaction = require('./models/Transaction');


User.hasMany(Transaction)
Transaction.belongsTo(User)


const syncAndSeed = ()=>{
  return conn.sync({force: !process.env.DB_FORCE})
    .then(() => {
      if(!process.env.DB_FORCE){
        return User.create({
        email: 'test@test.com',
        password: 'password',
        firstName: 'test',
        lastName: 'test'
      })}else{
        return Promise.resolve()
      }
    })
}

module.exports = {
  syncAndSeed,
  models: {
    User,
    Transaction
  }
}
