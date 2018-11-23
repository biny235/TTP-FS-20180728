import React from 'react';

const StockRow = ({ stock })=>{
  return(
    <div className='stock-row'>
      <div className={gainOrLoss(stock)}>{stock.ticker}</div>
      <div>${(stock.totalPrice).toFixed(2)}</div>
      <div>{stock.qty}</div>
      <div className={gainOrLoss(stock)}><i className={`fas fa-arrow${arrowType(gainOrLoss(stock))}`} /> ${currentTotal(stock)}</div>
    </div>
  )
}

const currentTotal = (stock)=>{

  return ((stock.lastSalePrice * 1) * stock.qty).toFixed(2)
}

const gainOrLoss = (stock)=>{
  stock.openingPrice = stock.openingPrice || 0
  stock.lastSalePrice = stock.lastSalePrice || 0
  if(stock.lastSalePrice.toFixed(2) < stock.openingPrice.toFixed(2)){
    return 'loss'
  }else if(stock.lastSalePrice.toFixed(2) > stock.openingPrice.toFixed(2)){
    return 'gain'
  }else{
    return 'default'
  }
}

const arrowType = (a)=>{
  if(a === 'loss'){
    return '-down'
  }else if(a === 'gain'){
    return '-up'
  }else{
    return 's-alt-h'
  }
}

export default StockRow