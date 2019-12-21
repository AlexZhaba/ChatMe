import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import {
    thunk_getSubscribtions,
    thunk_getAuthenticatedStatus,
    thunk_logout
} from './../../redux/reducers/subscribtionReducer';
import {
  updateSearchTextAC
} from './../../redux/reducers/accountReducer';
import SubscribtionPage from './subscribtionPage';
import Header from './../header/Header';

let SubscribtionsPageContainer = (props) => {
    useEffect(() => {
        console.log('UserID = ' + props.userAuthenticatedId)
        // if (props.userAuthenticatedId) {
            props.thunk_getSubscribtions();
        // }
    },[]);
    useEffect(() => {
      props.thunk_getAuthenticatedStatus();
    },[]);
    debugger;
    return (
        <div>
            <Header
              userAuthenticatedId = {props.userAuthenticatedId}
              isAuthenticated = {props.isAuthenticated}
              logout={props.thunk_logout}
              updateSearchText = {props.updateSearchTextAC}
              searchText = {props.searchText}
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
        isAuthenticated: state.subscribtionReducer.isAuthenticated,
        searchText : state.accountReducer.searchText,
    }
};

export default connect(mapStateToProps, {thunk_getSubscribtions, thunk_logout,
                                          updateSearchTextAC, thunk_getAuthenticatedStatus})(SubscribtionsPageContainer);
