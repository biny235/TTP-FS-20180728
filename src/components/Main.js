import React from 'React';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { checkUser } from '../store'

import Login from './Login';
import Dashboard from './Dashboard';

class Main extends React.Component{
  constructor(props){
    super(props);
    props.checkUser()
  };

  render(){
    const { user } = this.props;

    return(
      <div className='container'>
        {user.email ? 
          <Dashboard />
          :
          <Login />
        }
      </div>
    )
  }
}

const mapStateToProps = ({user})=>{
  return {
    user
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    checkUser: () => dispatch(checkUser)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
