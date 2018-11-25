import React from 'React';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { checkUser } from '../store'

import Login from './Login';
import Dashboard from './Dashboard';
import Transactions from './Transactions';

class Main extends React.Component{
  constructor(props){
    super(props);
    props.checkUser()
  };

  render(){
    const { user } = this.props;

    return(
      <div className='container'>
        <Switch>
          <Route path='/' exact render={()=> <CheckLogin user={user} component={<Dashboard />}/>} />
          <Route path='/transactions' exact render={() => <CheckLogin user={user} component={<Transactions />}/>} />
        </Switch>
      </div>
    )
  }
}

const CheckLogin = ({user, component})=>{
  if(user.email){
    return component
  }else{
    return <Login />
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
