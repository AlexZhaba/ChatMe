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

  //IT'S THUNKS
  thunk_GetAccountInfo,
  thunk_logout

} from '../../redux/reducers/accountReducer';
import AccountPage0 from './AccountPage0'
let AccountContainer = (props) => {
  // componentDidMount() {
  //   console.log('props = ' + this.props);
  //   this.props.thunk_GetAccountInfo(this.props.match.params.id);
  // }
   useEffect( () => {
     props.thunk_GetAccountInfo(props.match.params.id);
   }, [props.match.params.id]);
  let logout = () => {
    props.thunk_logout();
  }
    console.log('really_props = ', props);
    return (
      <div>
        <AccountPage0
          user = {props.user}
          isAuthenticated = {props.isAuthenticated}
          myAccount = {props.myAccount}
          URLAdress = {props.URLAdress}
          userAuthenticatedId = {props.userAuthenticatedId}
          logout = {logout}
          notFound = {props.notFound}
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
    notFound : state.accountReducer.notFound
  }
}
export default connect(mapStateToProps, {isAuthenticatedAC, myAccountAC, notFoundAC, setUserAC,
                                         setURLAdressAC, setUserAuthenticatedIdAC, thunk_GetAccountInfo,
                                       thunk_logout})(AccountContainer);
