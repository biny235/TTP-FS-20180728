import React from 'react';
import { connect } from 'react-redux'

import BuyForm from './BuyForm';
import Portfolio from './Portfolio';

class Dashboard extends React.Component{
  constructor(){
    super()
  }


  render(){
    const { balance } = this.props
    return(
      <div className='dashboard'>
        <div>
          <Portfolio />
        </div>
        <div className='buy-form'> 
          <h4>Current Balance: ${balance.toFixed(2)}</h4>
          <BuyForm />
        </div>
      </div>)
  }

}

const mapStateToProps = ({user}) => {
  return{
    balance: user.balance * 1
  }
}

export default connect(mapStateToProps)(Dashboard)
