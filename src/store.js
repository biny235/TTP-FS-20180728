import {createStore, applyMiddlware, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//if there is a token it will always be in the header
let token = window.localStorage.getItem('token');
axios.defaults.headers.common.token = token;


///----USERS------
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const UPDATE_BALACE = 'UPDATE_BALACE';

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
      break;
    case UPDATE_BALACE:
      return Object.assign(state, {balance: action.balance})
    default:
      return state
  }
}

//TRANSACTIONS AND STOCKS
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
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
        console.log(transaction)
        dispatch(getTransactions)
        dispatch({type: UPDATE_BALACE, balance: transaction.balance})
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

const stockReducer = (state = {}, action) =>{
  switch(action.type){
    case GET_TRANSACTIONS: 
      return action.transactions.reduce((memo, transaction)=>{
        if(!memo[transaction.ticker]) memo[transaction.ticker] = {qty:0, totalPrice: 0};
        memo[transaction.ticker].qty += transaction.qty;
        memo[transaction.ticker].totalPrice += transaction.qty * transaction.price
        return memo
      },{})
    default:
      return {}
  }
}




const reducer = combineReducers({
  user: userReducer,
  stocks: stockReducer,
  transactions: transactionReducer
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store;
