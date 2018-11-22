import React from 'react';
import {connect} from 'react-redux';

import StockRow from './StockRow';

const Portfolio = (props)=>{

  const {stocks, portfolioBalance} = props

  return(
    <div>
      <h4>Portfolio: (${portfolioBalance.toFixed(2)})</h4>
      <div className='portfolio'>
        <div className='stock-row'>
          <div>Symbol</div>
          <div>Total Purchase Price</div>
          <div>Total Qty</div>
          <div>Current Value</div>
        </div>
        {stocks.map(stock => {
          return <StockRow stock={stock} key={stock.ticker}/>
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  const {stocks} = state;
  const portfolioBalance = stocks.reduce((ttl, stock)=>{
    return ttl += stock.totalPrice
  },0)
  return {
    stocks,
    portfolioBalance
  }
}

export default connect(mapStateToProps)(Portfolio) 