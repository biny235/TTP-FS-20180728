import React from 'react';
import { connect } from 'react-redux';
import { buyStock } from '../store';
import axios from 'axios';

class BuyForm extends React.Component{
  constructor(){
    super()
    this.state = {
      ticker: '',
      qty: 0,
      price: 0
    }

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.getQuoute = this.getQuoute.bind(this)
  }

  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value})
    if(ev.target.name === 'ticker') this.getQuoute(ev.target.value)
  }

  getQuoute(ticker){
    axios.get(`/api/stock/quote/${ticker}`)
      .then(res => res.data)
      .then(info => {
        this.setState({price: info.iexRealtimePrice})
      })
      .catch(err => console.log(err))
  }

  onClick(){
    this.props.buyStock(this.state)
  }

  render(){
    const { price, qty } = this.state;
    const { onChange, onClick } = this;
    const { balance } = this.props;
    const canAfford = balance > (price * qty);
    return (
      <div className='buy-form-container'>
        <div className='form-row'>
          <div className='col'>
            <input className='form-control' placeholder='Symbol' name='ticker' onChange={onChange}/>
          </div>
          <div className='col-form-label buy-form-label'>
            <label>Current Price: ${price.toFixed(2)}</label>
          </div>
        </div>
        <div className='form-row'>
          <div className='col'>
            <input className='form-control' placeholder='Qty' name='qty' onChange={onChange}/>
          </div>
          <div className='col-form-label buy-form-label'> 
            <label>Total Price: ${(price * qty).toFixed(2)}</label>
          </div>
          
        </div>
        <div className='form-row'>
          <div className='col'> 
              <button 
              className={`btn btn-block ${canAfford ? 'btn-success' : 'btn-danger'}`} 
              disabled={!canAfford}
              onClick={onClick}
              >
                {canAfford ? 'Buy' : 'Low Balance'}
              </button>
          </div>
        </div>
      </div>
    )
  }


}

const mapStateToProps = ({user}) => {
  return {
    balance: user.balance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyStock: stock => dispatch(buyStock(stock))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BuyForm);