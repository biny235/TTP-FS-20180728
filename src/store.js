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
      // dispatch(getTransactions);
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
    default:
      return state
  }
}

//TRANSACTIONS AND STOCKS
// const 


// const stockReducer = (state = [], action) =>{
//   switch(action.type){

//   }
// }




const reducer = combineReducers({
  user: userReducer
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store;
