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

  return ((stock.bidPrice * 1) * stock.qty).toFixed(2)
  
}

const gainOrLoss = (stock)=>{
  stock.open = stock.open || 0
  stock.bidPrice = stock.bidPrice || stock.iexBidPrice || stock.latestPrice || 0
  if(stock.bidPrice.toFixed(2) < stock.open.toFixed(2)){
    return 'loss'
  }else if(stock.bidPrice.toFixed(2) > stock.open.toFixed(2)){
    return 'gain'
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