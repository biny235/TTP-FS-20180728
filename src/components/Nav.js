import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../store';

const NavBar = (props)=>{

  return(
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a className='navbar-brand'><img src='/assets/logo.png' /></a>
      <ul className='navbar-nav ml-auto'>
        {props.user.email ? 
          <li className='nav-item'>
            <button className='nav-btn btn btn-outline-primary' onClick={logout}>Logout</button>
          </li>
          :
          null
        }
        <li className='nav-item'>
          <Link className='nav-link' to='/'>Portfolio</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/transactions'>Transactions</Link>
        </li>
      </ul>
    </nav>
  )

}

export default NavBar
