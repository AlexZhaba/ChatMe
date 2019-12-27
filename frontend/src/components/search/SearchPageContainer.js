import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import SearchPage from './SearchPage';
import Header from './../header/Header';
import {Redirect} from 'react-router-dom';
import {
  updateSearchTextAC,
  thunk_logout,
  thunk_getAuthenticatedStatus,
  thunk_searchUsers,
  setSearchUsersAC,
  setLastFetchTextAC
} from './../../redux/reducers/searchReducer'
import Sidebar from './../sidebar/sidebar';
let SearchPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAuthenticatedStatus();
  },[]);
  return (
    <div>
        <Sidebar
          userAuthenticatedId = {props.userAuthenticatedId}
          />
        <Header
          logout = {props.thunk_logout}
          userAuthenticatedId = {props.userAuthenticatedId}
          isAuthenticated = {props.isAuthenticated}
        />
        {((props.isAuthenticated)||(props.userAuthenticatedId == '')) ?
          <SearchPage
            searchText = {props.searchText}
            updateSearchText = {props.updateSearchTextAC}
            fetching = {props.fetching}
            lastFetchText = {props.lastFetchText}
            searchUsers = {props.searchUsers}
            thunk_searchUsers = {props.thunk_searchUsers}
            setSearchUsers = {props.setSearchUsersAC}
            setLastFetchText = {props.setLastFetchTextAC}
          />
        :
        <Redirect to='/signup'></Redirect>
        }
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    userAuthenticatedId : state.searchReducer.userAuthenticatedId,
    isAuthenticated: state.searchReducer.isAuthenticated,
    searchText: state.searchReducer.searchText,
    fetching: state.searchReducer.fetching,
    lastFetchText: state.searchReducer.lastFetchText,
    searchUsers: state.searchReducer.searchUsers
  }
};

export default connect(mapStateToProps, {updateSearchTextAC, thunk_logout, thunk_searchUsers,
                                         thunk_getAuthenticatedStatus, setSearchUsersAC, setLastFetchTextAC})(SearchPageContainer);
