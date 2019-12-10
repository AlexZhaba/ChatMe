import {connect} from 'react-redux';
import React from 'react';
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

} from '../../redux/reducers/accountReducer';
import AccountPage0 from './AccountPage0'
class AccountContainer extends React.Component {
  componentDidMount() {
    console.log('props = ' + this.props);
    this.props.thunk_GetAccountInfo(this.props.match.params.id);
  }
  logout() {

  }
  render() {
    console.log('really_props = ', this.props);
    return (
      <div>
        <AccountPage0
          user = {this.props.user}
          isAuthenticated = {this.props.isAuthenticated}
          myAccount = {this.props.myAccount}
          URLAdress = {this.props.URLAdress}
          userAuthenticatedId = {this.props.userAuthenticatedId}
          logout = {this.logout}
          notFound = {this.props.notFound}
        />
      </div>
    )
  }
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
                                         setURLAdressAC, setUserAuthenticatedIdAC, thunk_GetAccountInfo})(AccountContainer);
