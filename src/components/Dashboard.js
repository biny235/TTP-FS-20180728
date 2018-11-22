import React from 'react';
import { connect } from 'react-redux'

import BuyForm from './BuyForm';

class Dashboard extends React.Component{
  constructor(){
    super()
  }


  render(){
    const { balance } = this.props
    return(
      <div className='dashboard'>
        <h4>{balance}</h4>
        <BuyForm />
      </div>)
  }

}

const mapStateToProps = ({user}) => {
  return{
    balance: user.balance
  }
}

export default connect(mapStateToProps)(Dashboard)
