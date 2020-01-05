import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Header from './../header/Header';
import Sidebar from './../sidebar/sidebar';
import {
  thunk_getAuthenticatedStatus,
  thunk_logout,
  thunk_getDialogs
} from './../../redux/reducers/dialogsReducer';
import './DialogsPageStyles.css'
import DialogsPage from './DialogsPage'
let DialogsPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAuthenticatedStatus();
  }, [])
  useEffect(() => {
    props.thunk_getDialogs();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
        props.thunk_getDialogs();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='dialogs-wrapper'>

      <Header
        isAuthenticated = {props.isAuthenticated}
        userAuthenticatedId = {props.userAuthenticatedId}
        thunk_logout = {props.thunk_logout}
      />
    <div className='sidebar-block-block'>
      <Sidebar
        userAuthenticatedId = {props.userAuthenticatedId}
      />
    </div>
        <DialogsPage
          dialogs = {props.dialogs}
        />
    </div>
  )
};

let mapStateToProps = (state) => {
  console.log(state)
  return {
    isAuthenticated: state.dialogsReducer.isAuthenticated,
    userAuthenticatedId: state.dialogsReducer.userAuthenticatedId,
    dialogs: state.dialogsReducer.dialogs
  }
}

export default connect(mapStateToProps, {thunk_getAuthenticatedStatus, thunk_logout,
                                         thunk_getDialogs})(DialogsPageContainer);
