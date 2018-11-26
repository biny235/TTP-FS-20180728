import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { checkUser } from '../store'

import Login from './Login';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import NavBar from './Nav';

class Main extends React.Component{
  constructor(props){
    super(props);
    props.checkUser()
  };

  render(){
    const { user } = this.props;

    return(
      <Router>
        <div>
          <NavBar />
            <div className='container'>
              <Switch>
                <Route path='/transactions' exact render={() => <CheckLogin user={user} component={<Transactions />}/>} />
                <Route path='/' exact render={()=> <CheckLogin user={user} component={<Dashboard />}/>} />
              </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const CheckLogin = ({ user, component }) => {
  if(!user.email || !window.localStorage.getItem('token')){
    return <Login />
  }else{
    return component
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
