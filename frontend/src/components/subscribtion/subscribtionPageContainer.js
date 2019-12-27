import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import {
    thunk_getSubscribtions,
    thunk_getAuthenticatedStatus,
    thunk_logout
} from './../../redux/reducers/subscribtionReducer';
import SubscribtionPage from './subscribtionPage';
import Header from './../header/Header';
import Sidebar from './../sidebar/sidebar'
let SubscribtionsPageContainer = (props) => {
    useEffect(() => {
        console.log('UserID = ' + props.userAuthenticatedId);
        // if (props.userAuthenticatedId) {
            debugger;
            props.thunk_getSubscribtions();
        // }
    },[]);
    useEffect(() => {
      props.thunk_getAuthenticatedStatus();
    },[]);
    // debugger;
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
            <SubscribtionPage
                subscribtions = {props.subscribtions}
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
        subscribtions : state.subscribtionReducer.subscribtions,
        userAuthenticatedId: state.subscribtionReducer.userAuthenticatedId,
        isAuthenticated: state.subscribtionReducer.isAuthenticated
    }
};

export default connect(mapStateToProps, {thunk_getSubscribtions, thunk_logout,
                                           thunk_getAuthenticatedStatus})(SubscribtionsPageContainer);
