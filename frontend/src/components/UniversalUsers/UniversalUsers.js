import React from 'react';
import './UniversalUsersStyles.css';
let UniversalUsers = (props) => {
  let users = props.users.map(e =>
    <div className='UnUser-block'>
      <img src ='https://versiya.info/uploads/posts/2017-12/1514394485_0_145981_147f0c07_orig.jpg'/>
    <div className='UnUser-info'>
          {e}
      </div>
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
