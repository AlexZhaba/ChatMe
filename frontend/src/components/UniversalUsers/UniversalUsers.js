import React from 'react';
import './UniversalUsersStyles.css';
import {NavLink} from 'react-router-dom';
let UniversalUsers = (props) => {
  if (props.users ) {
      var users = props.users.map(e =>
        <div className='UnUser-block'>
          <img src ='https://versiya.info/uploads/posts/2017-12/1514394485_0_145981_147f0c07_orig.jpg'/>
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
