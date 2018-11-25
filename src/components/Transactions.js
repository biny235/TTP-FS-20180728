import React from 'react';
import { connect } from 'react-redux';
import TransactionRow from './TransactionRow';

const Transaction = (props)=>{

  const { transactions } = props

  return(
    <div className='transactions'>
      <div className='transaction-row'>
        <div>Type</div>
        <div>Symbol</div>
        <div>Qty</div>
        <div>Price</div>
      </div>
      {transactions.map(transaction => {
        return <TransactionRow transaction={transaction} key={transaction.id}/>
      })}
    </div>
  )

}


const mapStateToProps = ({transactions}) => {

  return { transactions }

}

export default connect(mapStateToProps)(Transaction)