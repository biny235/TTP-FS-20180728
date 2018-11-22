import React from 'react';

const StockRow = ({stock})=>{
  console.log(stock)
  return(
    <div className='stock-row'>
      <div>{stock.ticker}</div>
      <div>${(stock.totalPrice).toFixed(2)}</div>
      <div>{stock.qty}</div>
    </div>
  )

}

export default StockRow