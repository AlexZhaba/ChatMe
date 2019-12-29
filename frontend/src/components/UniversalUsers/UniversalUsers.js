import React from 'react';
import './UniversalUsersStyles.css';
import {NavLink} from 'react-router-dom';
const MY_IP = require('./../../../config').MY_IP;

let UniversalUsers = (props) => {
  if (props.users ) {
      var users = props.users.map(e =>
        <div className='UnUser-block'>
          <img src ={`http://${MY_IP}:5003/api/avatar/${e.email}@${Date.now()}`}/>
        <div className='UnUser-info'>
          <div className='UnUser-name'>
            <div>
              {e.first_name} {e.last_name}
            </div>
            <div>
              <NavLink to={`/account/${e.email}`}>{e.email}</NavLink>
            </div>
          </div>

          </div>
        </div>
      );
  } else {
    var users = `There's nothing here`;
  }
  return (
    <div className='UniversalUsers-wrapper'>
      <div className='UniversalUsers-block'>
        {users}
      </div>
    </div>
  )
}

export default UniversalUsers;
