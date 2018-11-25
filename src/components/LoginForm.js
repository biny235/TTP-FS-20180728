import React from 'react';
import { connect } from 'react-redux';

import { login } from '../store'

class LoginForm extends React.Component{
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
  };

  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value})
  };

  submitUser(){
    this.props.login(this.state)
  };

  render(){
    const { email, password } = this.state;
    const {onChange, submitUser} = this;

    return(  
      <div className='form-group'>
        <input name='email' className='form-control' placeholder='e-mail' onChange={onChange}/>
        <input name='password' type='password' className='form-control' placeholder='Password' onChange={onChange}/>
        <button
        className='btn btn-success btn-block' 
        onClick={submitUser}
        disabled={!email || !password}
        >Submit</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    login: user => dispatch(login(user))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);