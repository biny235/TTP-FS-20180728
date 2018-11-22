import React from 'react';;
import {connect} from 'react-redux';

import StockRow from './StockRow';

const Portfolio = (props)=>{

  const {stocks} = props
  console.log(stocks)
  return(
    <div className='portfolio'>
      <div className='stock-row'>
        <div>Symbol</div>
        <div>Total Purchase Price</div>
        <div>Total Qty</div>
        <div>Current Value</div>
      </div>
      {props.stocks.map(stock => {
        return <StockRow stock={stock} key={stock.ticker}/>
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  const {stocks} = state;
  let stocksArr = []
  for(var stock in stocks){
    stocksArr.push(Object.assign({}, stocks[stock], {ticker: stock}))
  }
  return {
    stocks: stocksArr
  }
}

export default connect(mapStateToProps)(Portfolio) 