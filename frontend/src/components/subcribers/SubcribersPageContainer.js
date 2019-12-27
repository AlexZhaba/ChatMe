import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import React, { useEffect } from 'react';
import {
    thunk_getSubscribers,
    thunk_getAuthenticatedStatus,
    thunk_logout
} from './../../redux/reducers/subscribersPageReducer';
import UniversalUsers from './../UniversalUsers/UniversalUsers';
import SubscribersPage from './subscribersPage'
import Header from './../header/Header';
import Sidebar from './../sidebar/sidebar'

let SubscriberPageContainer = (props) => {
    useEffect(() => {
        console.log('UserID = ' + props.userAuthenticatedId)
        // if (props.userAuthenticatedId) {
            props.thunk_getSubscribers();
        // }
    },[]);
    useEffect(() => {
      props.thunk_getAuthenticatedStatus();
    },[]);
    debugger;
    return (
      <div>
        <Sidebar
          userAuthenticatedId = {props.userAuthenticatedId}

        />
          <Header
            userAuthenticatedId = {props.userAuthenticatedId}
            isAuthenticated = {props.isAuthenticated}
            logout={props.thunk_logout}
          />
        {((props.isAuthenticated)||(props.userAuthenticatedId == '')) ?
          <SubscribersPage
              subscribers = {props.subscribers}
          />
        :
        <Redirect to='/signup'></Redirect>
        }
      </div>
    );
}

let mapStateToProps = (state) => {
    debugger;
    return {
        subscribers : state.subscribersPageReducer.subscribers,
        userAuthenticatedId : state.subscribersPageReducer.userAuthenticatedId,
        isAuthenticated : state.subscribersPageReducer.isAuthenticated
    };
};

export default connect(mapStateToProps, {thunk_getSubscribers,
                       thunk_getAuthenticatedStatus, thunk_logout})(SubscriberPageContainer);
