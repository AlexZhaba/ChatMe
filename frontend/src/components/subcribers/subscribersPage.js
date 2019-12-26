import React from 'react';
import Header from './../header/Header';
import UniversalUsers from './../UniversalUsers/UniversalUsers'
const SubscribersPage = (props) => {
    // let subscribtions =
    return (
        <div class='subscribtions-wrapper'>
          <UniversalUsers
              users = {props.subscribers}
          />
        </div>
    );
}

export default SubscribersPage;
