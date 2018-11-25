import React from 'react';

const TransactionRow = ({ transaction })=>{
  return(
    <div className='transaction-row'>
      <div >{transaction.type}</div>
      <div>{transaction.ticker}</div>
      <div>{transaction.qty}</div>
      <div>${(transaction.price * 1) * (transaction.qty * 1) }</div>
    </div>
  )
}

export default TransactionRow;
