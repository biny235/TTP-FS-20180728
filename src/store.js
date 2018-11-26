import {createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import socket from './sockets';


//if there is a token it will always be in the header
let token = window.localStorage.getItem('token');
axios.defaults.headers.common.token = token;


///----USERS------
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const UPDATE_BALANCE = 'UPDATE_BALANCE';

export const login = user => {
  return dispatch => {
    return axios
      .post(`/api/user/login`, {user})
      .then(res => res.data)
      .then(token =>{
        setToken(token)
        dispatch(authenticateUser)
      })
  }
}

export const register = (user) => {
  return dispatch => {
    return axios
      .post('/api/user/register', { user })
      .then(res => res.data)
      .then(token => {
        setToken(token)
        dispatch(authenticateUser)
      })
  }
}

const setToken = (token) => {
  axios.defaults.headers.common.token = token;
  window.localStorage.setItem('token', token)
}

export const authenticateUser = dispatch =>{
  return axios.get('/api/user')
    .then(res => res.data)
    .then(user => {
      dispatch({type: LOGIN, user});
      dispatch(getTransactions);
    })
    .catch(err => {
      window.localStorage.clear()
    })
}

export const checkUser = dispatch => {
  if(token) dispatch(authenticateUser)
}

export const logout = ()=>{
  store.dispatch({type: LOGOUT})
}


const userReducer = (user = {}, action)=>{
  switch(action.type){
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    case UPDATE_BALANCE:
      return Object.assign({}, user, { balance: action.transaction.balance })
    default:
      return user
  }
}

//TRANSACTIONS AND STOCKS
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const STOCK_UPDATE = 'STOCK_UPDATE';
const SET_OPEN = 'SET_OPEN';
const BUY_STOCK = 'BUY_STOCK';

export const getTransactions = dispatch => {
  axios.get(`/api/user/transactions`)
    .then(res => res.data)
    .then(transactions => { 
      dispatch({type: GET_TRANSACTIONS, transactions})
    })
}

export const buyStock = stock => {
  return dispatch => {
    axios.post(`/api/stock/buy`, stock)
      .then(res => res.data)
      .then(transaction => {
        dispatch({type: UPDATE_BALANCE, transaction})
        dispatch({type: BUY_STOCK, stock: transaction})
      })
  }
}

socket.on('message', stock => {
  stock = JSON.parse(stock)
  store.dispatch({type: STOCK_UPDATE, stock})
})

const getOpeningPrice = (_stock) => {
  axios.get(`/api/stock/quote/${_stock}`)
    .then(res => res.data)
    .then((stock) => {
      store.dispatch({type: SET_OPEN, stock})
    })
}

const stockReducer = (stocks = [], action) =>{
  switch(action.type){
    case GET_TRANSACTIONS: 
      let stockArr =[]
      // ADD ALL THE TOTALS FOR ALL THE TRANSACTIONS
      const transactions = action.transactions
      const stocksObj = transactions.reduce((memo, transaction)=>{
        if(!memo[transaction.ticker]) memo[transaction.ticker] = {qty:0, totalPrice: 0, ticker: transaction.ticker};
        memo[transaction.ticker].qty += transaction.qty;
        memo[transaction.ticker].totalPrice += transaction.qty * transaction.price
        return memo
      },{})
      for(let stock in stocksObj) {
        // subscribe for stock updates
        socket.emit('subscribe', stock);
        getOpeningPrice(stock);
        stockArr.push(stocksObj[stock]);
      }
      return stockArr
    case BUY_STOCK: 
      if(stocks.find(stock => stock.ticker === action.stock.ticker)){
        stocks = stocks.map(stock => {
          if(stock.ticker === action.stock.ticker){
            stock.qty += action.stock.qty * 1
            stock.totalPrice += (action.stock.qty * 1) * (action.stock.price * 1)
          }
          return stock
        })
      }else{
        stocks = [...stocks, {qty: action.stock.qty * 1, totalPrice: (action.stock.qty * 1) * (action.stock.price * 1), ticker: action.stock.ticker}]
        socket.emit('subscribe', action.stock.ticker);
        getOpeningPrice(action.stock.ticker);
      }

      return stocks
    case STOCK_UPDATE:
      return stocks.map(stock => stock.ticker === action.stock.symbol ? Object.assign({}, stock, action.stock) : stock)
    case SET_OPEN:
      return stocks.map(stock => stock.ticker === action.stock.symbol ? Object.assign({}, stock, action.stock) : stock)
    default:
      return stocks
  }
}


const transactionReducer = (transactions = [], action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    case BUY_STOCK:
      return [...transactions, action.stock]
    default:
      return transactions
  }
}

// REDUCE COMBINER AND STORE EXPORTER
const reducer = combineReducers({
  stocks: stockReducer,
  user: userReducer,
  transactions: transactionReducer
})


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
