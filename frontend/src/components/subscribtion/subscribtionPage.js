import React from 'react';
import Header from './../header/Header';
import UniversalUsers from './../UniversalUsers/UniversalUsers'
const SubscribtionPage = (props) => {
    // let subscribtions =
    return (
        <div class='subscribtions-wrapper'>
          <UniversalUsers
              users = {props.subscribtions}
          />
        </div>
    );
}

export default SubscribtionPage;
