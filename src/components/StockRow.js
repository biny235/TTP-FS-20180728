import React from 'react';

const StockRow = ({ stock })=>{
  return(
    <div className='stock-row'>
      <div>{stock.ticker}</div>
      <div>${(stock.totalPrice).toFixed(2)}</div>
      <div>{stock.qty}</div>
      <div className={gainOrLoss(stock)}><i className={`arrow-${gainOrLoss(stock)}`} /> ${currentTotal(stock)}</div>
    </div>
  )
}

const currentTotal = (stock)=>{

  return ((stock.lastSalePrice * 1) * stock.qty).toFixed(2)
}

const gainOrLoss = (stock)=>{
  if(stock.lastSalePrice < stock.openingPrice){
    return 'loss'
  }else if(stock.lastSalePrice > stock.openingPrice){
    return 'gain'
  }else{
    return 'default'
  }
}

export default StockRow