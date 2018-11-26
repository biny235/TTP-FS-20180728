import React from 'react';

const Error = (props)=>{

  return(
    <div className='alert alert-danger'>
      {props.error}
      <button type='button' className='close' onClick={props.clearErrors}>
        <span >&times;</span>
      </button>
    </div>
    )
}

export default Error;
