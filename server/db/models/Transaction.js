const conn = require('../conn');
const Sequelize = require('sequelize');

const Transaction = conn.define('transaction', {
  type:{
    type: Sequelize.ENUM('BUY', 'SELL') 
  },
  qty:{
    type: Sequelize.INTEGER,
    set(val){
      this.setDataValue('qty', val * 1)
    }
  },
  time: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  price: {
    type: Sequelize.DECIMAL
  },
  ticker: {
    type: Sequelize.STRING
  }
})

module.exports = Transaction;