import React from 'react';
import './UniversalUsersStyles.css';
let UniversalUsers = (props) => {
  let users = props.users.map(e => 
    <div>
      {e}
    </div>
  );
  return (
    <div className='UniversalUsers-wrapper'>
      <div className='UniversalUsers-block'>
        {users}
      </div>
    </div>
  )
}

export default UniversalUsers;
