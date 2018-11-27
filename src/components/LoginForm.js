import React from 'react';
import { connect } from 'react-redux';

import { login } from '../store';
import Error from './Error';

class LoginForm extends React.Component{
  constructor(){
    super()
    this.state = {
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
    this.props.login(this.state)
      .catch(err => this.setState({error: err.response.data}))
  };

  clearErrors(){
    this.setState({error: ''})
  }

  render(){
    const { email, password, error } = this.state;
    const {onChange, submitUser, clearErrors} = this;

    return(  
      <form onSubmit={submitUser} className='form-group'>
        <input name='email' className='form-control' placeholder='e-mail' onChange={onChange}/>
        <input name='password' type='password' className='form-control' placeholder='Password' onChange={onChange}/>
        <div>
            {error ? <Error error={error} clearErrors={clearErrors}/> : null}
        </div>
        <button
        className='btn btn-success btn-block' 
        onClick={submitUser}
        disabled={!email || !password}
        >Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    login: user => dispatch(login(user))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);