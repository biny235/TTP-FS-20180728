import React from 'react';
import {connect} from 'react-redux';

import StockRow from './StockRow';

const Portfolio = (props)=>{

  const {stocks} = props

  return(
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
  )
}

const mapStateToProps = (state) => {
  const {stocks} = state;
  return {
    stocks
  }
}

export default connect(mapStateToProps)(Portfolio) 