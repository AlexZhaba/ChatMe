import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  thunk_getAuthenticatedStatus,
  thunk_logout
} from './../../redux/reducers/newsReducer'
import Header from './../header/Header';
import Sidebar from './../sidebar/sidebar'
import NewsPage from './NewsPage'


let NewsPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAuthenticatedStatus();
  },[])
  return (
    <div>
      <Sidebar
        userAuthenticatedId = {props.userAuthenticatedId}
      />
      <Header
        isAuthenticated = {props.isAuthenticated}
        userAuthenticatedId = {props.userAuthenticatedId}
        thunk_logout = {props.thunk_logout}
      />
    <NewsPage
    />
    </div>
  );
}

let mapStateToProps = (state) => {
  debugger;
  return {
    isAuthenticated: state.newsReducer.isAuthenticated,
    userAuthenticatedId: state.newsReducer.userAuthenticatedId
  }
}

export default connect(mapStateToProps, {
  thunk_getAuthenticatedStatus, thunk_logout
})(NewsPageContainer);
