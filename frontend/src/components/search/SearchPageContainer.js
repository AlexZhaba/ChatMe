import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import SearchPage from './SearchPage';
import Header from './../header/Header';
import {Redirect} from 'react-router-dom';
import {
  updateSearchTextAC,
  thunk_logout,
  thunk_getAuthenticatedStatus
} from './../../redux/reducers/searchReducer'
let SearchPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAuthenticatedStatus();
  },[]);
  return (
    <div>
        {}
        <Header
          logout = {props.thunk_logout}
          userAuthenticatedId = {props.userAuthenticatedId}
          isAuthenticated = {props.isAuthenticated}
        />
        {((props.isAuthenticated)||(props.userAuthenticatedId == '')) ?
          <SearchPage
            searchText = {props.searchText}
            updateSearchText = {props.updateSearchTextAC}
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
    userAuthenticatedId : state.searchReducer.userAuthenticatedId,
    isAuthenticated: state.searchReducer.isAuthenticated,
    searchText: state.searchReducer.searchText
  }
};

export default connect(mapStateToProps, {updateSearchTextAC, thunk_logout,
                                         thunk_getAuthenticatedStatus})(SearchPageContainer);
