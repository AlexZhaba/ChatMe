import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
   //IT'S ACTION CREATORS;
  isAuthenticatedAC,
  myAccountAC,
  notFoundAC,
  setUserAC,
  setURLAdressAC,
  setUserAuthenticatedIdAC,
  updateNewPostValueAC,
  updateSearchTextAC,
  thunk_getUserPosts,
  setUpdateAC,
  //IT'S THUNKS
  thunk_GetAccountInfo,
  thunk_logout,
  thunk_addNewPost,
  thunk_getFollowing,
  thunk_setFollowing,
  thunk_onLike
} from '../../redux/reducers/accountReducer';
import AccountPage0 from './AccountPage0'
let AccountContainer = (props) => {
  debugger;
  useEffect( () => {
    console.log('USE EFFECT == ' + props.user.email,' ');
    if ((props.user.email)) {
      // debugger;
      props.thunk_getFollowing(props.user.email);
    }
  },[props.match.params.id, props.user]);
  useEffect( () => {
    if ((props.user.email)) {
      props.thunk_getUserPosts(props.user.email);
      // props.thunk_GetAccountInfo(props.match.params.id)
    }
  }, [props.user]);
  useEffect( () => {
     props.thunk_GetAccountInfo(props.match.params.id);
   }, [props.match.params.id]);
  let logout = () => {
    props.thunk_logout();
  }
  if (props.update) {
    debugger;
    props.thunk_GetAccountInfo(props.match.params.id);
    props.setUpdateAC(false);
  }
    console.log('really_props = ', props);
    return (
      <div>
        <AccountPage0
          user = {props.user}
          isAuthenticated = {props.isAuthenticated}
          myAccount = {props.myAccount}
          URLAdress = {props.URLAdress}
          posts = {props.posts}
          userAuthenticatedId = {props.userAuthenticatedId}
          logout = {logout}
          notFound = {props.notFound}
          updateNewPostValue = {props.updateNewPostValueAC}
          newPostValue = {props.newPostValue}
          following = {props.following}
          thunk_setFollowing = {props.thunk_setFollowing}
          //thunk
          thunk_addNewPost = {props.thunk_addNewPost}
          thunk_onLike = {props.thunk_onLike}
        />
      </div>
    )
}
const mapStateToProps = (state) => {
  console.log('state = ',state);
  return {
    isAuthenticated : state.accountReducer.isAuthenticated,
    myAccount : state.accountReducer.myAccount,
    user : state.accountReducer.user,
    userAuthenticatedId : state.accountReducer.userAuthenticatedId,
    URLAdress : state.accountReducer.URLAdress,
    notFound : state.accountReducer.notFound,
    newPostValue : state.accountReducer.newPostValue,
    posts : state.accountReducer.posts,
    following: state.accountReducer.following,
    update: state.accountReducer.update
  }
}
export default connect(mapStateToProps, {thunk_GetAccountInfo, thunk_addNewPost, thunk_getFollowing, thunk_setFollowing, thunk_onLike,
                                        thunk_logout, updateNewPostValueAC, thunk_getUserPosts, setUpdateAC})(AccountContainer);
