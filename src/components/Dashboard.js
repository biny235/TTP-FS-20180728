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
          <h4>Portfolio: (${portfolioBalance.toFixed(2)})</h4>
          <Portfolio />
        </div>
        <div className='buy-form'> 
          <h4>Current Balance: ${balance.toFixed(2)}</h4>
          <BuyForm />
        </div>
      </div>)
  }

}

const mapStateToProps = ({user, stocks}) => {
  const portfolioBalance = stocks.reduce((ttl, stock)=>{
    return ttl += stock.totalPrice
  },0)

  return{
    balance: user.balance * 1,
    portfolioBalance
  }
}

export default connect(mapStateToProps)(Dashboard)
