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
      price: 0,
      validStock: false,
      companyName: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.getQuoute = this.getQuoute.bind(this)
  }

  onChange(ev){
    if(ev.target.name === 'qty') {
      ev.target.value = Math.floor(ev.target.value)
    }
    this.setState({[ev.target.name]: ev.target.value})
    if(ev.target.name === 'ticker' && ev.target.value) this.getQuoute(ev.target.value)
  }

  getQuoute(ticker){
    axios.get(`/api/stock/quote/${ticker}`)
      .then(res => res.data)
      .then(info => {
        this.setState({companyName: info.companyName, validStock: true, ticker: info.symbol, price: info.latestPrice.toFixed(2)})
      })
      .catch(err => {
        this.setState({validStock: false, price:0, companyName: 'Invalid Symbol'})
      })
  }

  onClick(ev){
    ev.preventDefault()
    this.props.buyStock(this.state)
      .then(()=>{
        this.setState({
          ticker: '',
          qty: 0,
          price: 0,
          validStock: false,
          companyName: ''
        })
      })
  }

  render(){
    const { price, qty, ticker, validStock, companyName } = this.state;
    const { onChange, onClick } = this;
    const { balance } = this.props;
    const canAfford = balance > (price * qty);
    return (
      <form onSubmit={onClick} className='buy-form-container'>
        <div className='form-row'>
          <div className='col'>
            <input className='form-control' value={ticker} placeholder='Symbol' name='ticker' onChange={onChange}/>
          </div>
          <div className='col-form-label buy-form-label'>
            <label>Current Price: ${(price * 1).toFixed(2)}</label>
          </div>
        </div>
        <div className='form-row'>
          <div className='col-form-label'>
            <label>Company Name:</label>
          </div>
          <div className='col-form-label mr-auto'>
            <label>{companyName}</label>
          </div>
        </div>
        <div className='form-row'>
          <div className='col'>
            <input 
            className='form-control' 
            type='number'
            min='1'
            step='1'
            placeholder='Qty' 
            name='qty'
            value={qty}
            onChange={onChange}/>
          </div>
          <div className='col-form-label buy-form-label'> 
            <label>Total Price: ${(price * qty).toFixed(2)}</label>
          </div>
          
        </div>
        <div className='form-row'>
          <div className='col'> 
              <button 
              className={`btn btn-block ${canAfford ? 'btn-success' : 'btn-danger'}`} 
              disabled={!validStock || !ticker || qty <= 0 || !canAfford}
              onClick={onClick}
              >
                {canAfford ? 'Buy' : 'Low Balance'}
              </button>
          </div>
        </div>
      </form>
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