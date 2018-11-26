import React from 'react';
import { connect } from 'react-redux'

import BuyForm from './BuyForm';
import Portfolio from './Portfolio';

class Dashboard extends React.Component{
  constructor(){
    super()
  }


  render(){
    const { balance, portfolioBalance } = this.props
    return(
      <div className='dashboard'>
        <div>
          <h4>Portfolio: ${portfolioBalance}</h4>
          <Portfolio />
        </div>
        <div className='buy-form'> 
          <h4>Current Balance: ${balance}</h4>
          <BuyForm />
        </div>
      </div>)
  }

}

const mapStateToProps = ({user, stocks}) => {
  const portfolioBalance = stocks.reduce((ttl, stock)=>{
    stock.bidPrice = stock.bidPrice || stock.iexBidPrice || stock.latestPrice || 0

    return ttl += ((stock.bidPrice * 1) * stock.qty)
  },0).toFixed(2)

  return{
    balance: (user.balance * 1).toFixed(2),
    portfolioBalance
  }
}

export default connect(mapStateToProps)(Dashboard)
