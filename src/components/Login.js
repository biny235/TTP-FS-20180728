import React from 'react';

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Login extends React.Component{
  constructor(){
    super()
    this.state = {
      login: true
    }
    this.changeState = this.changeState.bind(this)
  }

  changeState(){
    this.setState({login: !this.state.login})
  }

  render(){
    const { login } = this.state;
    const { changeState } = this
    return (
      <div className='jumbotron'>
        <ul className='nav nav-tabs center'>
          <li className='nav-item'>
            { this.state.login ? <span className='nav-link active'>Login</span> : 
              <a className='nav-link' onClick={changeState}>Login</a>
            }
          </li>
          <li className='nav-item'>
            { !this.state.login ? <span className='nav-link active'>Register</span> : 
              <a className='nav-link' onClick={changeState}>Register</a>
            }
          </li>
        </ul>
        <div className='login'>
          { login ? <LoginForm /> : <RegisterForm /> }
        </div>
      </div>
    )
  }
}

export default Login
