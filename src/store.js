import {createStore, applyMiddlware, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
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
        axios.defaults.headers.common.token = token;
        window.localStorage.setItem('token', token)
        dispatch(authenticateUser)
      })
  }
}

export const authenticateUser = dispatch =>{
  return axios.get('/api/user')
    .then(res => res.data)
    .then(user => {
      dispatch({type: LOGIN, user});
      dispatch(getTransactions);
    })
}

export const checkUser = dispatch => {
  if(token) dispatch(authenticateUser)
}


const userReducer = (state = {}, action)=>{
  switch(action.type){
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    case UPDATE_BALANCE:
      return Object.assign(state, { balance: action.balance })
    default:
      return state
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
        dispatch(getTransactions)
        dispatch({type: UPDATE_BALANCE, balance: transaction.balance})
      })
  }
}



const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    default:
      return []
  }
}

socket.on('message', stock => {
  stock = JSON.parse(stock)
  store.dispatch({type: STOCK_UPDATE, stock})
})

const getOpeningPrice = (_stock) => {
  axios.get(`/api/stock/openingprice/${_stock}`)
    .then(res => res.data)
    .then(({openingPrice}) => {
      const stock = {ticker:_stock, openingPrice}
      store.dispatch({type: SET_OPEN, stock})
    })
}

const stockReducer = (state = [], action) =>{
  switch(action.type){
    case GET_TRANSACTIONS: 
      let stockArr =[]
      // ADD ALL THE TOTALS FOR ALL THE TRANSACTIONS
      const stocksObj = action.transactions.reduce((memo, transaction)=>{
        if(!memo[transaction.ticker]) memo[transaction.ticker] = {qty:0, totalPrice: 0, ticker: transaction.ticker};
        memo[transaction.ticker].qty += transaction.qty;
        memo[transaction.ticker].totalPrice += transaction.qty * transaction.price
        return memo
      },{})
      for(var stock in stocksObj) {
        // subscribe for stock updates
        socket.emit('subscribe', stock);
        getOpeningPrice(stock);
        stockArr.push(stocksObj[stock]);
      }
      return stockArr
    case STOCK_UPDATE:
      return state.map(stock => stock.ticker === action.stock.symbol ? Object.assign({}, stock, action.stock) : stock)
    case SET_OPEN:
      return state.map(stock => stock.ticker === action.stock.ticker ? Object.assign({}, stock, {openingPrice: action.stock.openingPrice}) : stock)
    default:
      return []
  }
}


// REDUCE COMBINER AND STORE EXPORTER
const reducer = combineReducers({
  user: userReducer,
  stocks: stockReducer,
  transactions: transactionReducer
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store;
