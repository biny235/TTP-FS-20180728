import React from 'react';
import {connect} from 'react-redux';

import { register } from '../store'
import Error from './Error';

class Register extends React.Component{
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  };

  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value})
  };

  submitUser(ev){
    ev.preventDefault()
    this.props.register(this.state)
      .catch(err => this.setState({error: err.response.data}))
  };
  clearErrors(){
    this.setState({error: ''})
  }


  render(){
    const { firstName, lastName, email, password, error } = this.state;
    const {onChange, submitUser, clearErrors} = this;

    return(
        <form onSubmit={submitUser}>
          <div className='form-row'>
            <div className='col'>
              <input type='text' name='firstName' className='form-control' placeholder='First name' onChange={onChange}/>
            </div>
            <div className='col'>
              <input type='text' name='lastName' className='form-control' placeholder='Last name' onChange={onChange}/>
            </div>
          </div>
          <div className='form-row'>
            <div className='col'>
              <input name='email' type='text' className='form-control' placeholder='e-mail' onChange={onChange}/>
            </div>
            <div className='col'>
              <input name='password' type='password' className='form-control' placeholder='Password' onChange={onChange}/>
            </div>
          </div>
          <div>
            {error ? <Error error={error} clearErrors={clearErrors}/> : null}
          </div>
          <button type='submit' 
          className='btn btn-success btn-block' 
          onClick={submitUser}
          disabled={!firstName || !lastName || !email || !password}
          >Register</button>
        </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    register: user => dispatch(register(user))
  }
}

export default connect(null, mapDispatchToProps)(Register);