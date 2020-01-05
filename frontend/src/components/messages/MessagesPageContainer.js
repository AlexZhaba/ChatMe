import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  thunk_getAuthenticatedStatus,
  thunk_logout,
  updateMessageInputAC,
  setScrollAC,
  thunk_getMessages,
  thunk_getNewMessages,
  thunk_sendMessage
} from './../../redux/reducers/messagesReducers';
import Header from './../header/Header';
import Sidebar from './../sidebar/sidebar';
import MessagesPage from './MessagesPage';
import './MessagesPageStyles.css'
import {Redirect} from 'react-router-dom'
let MessagesPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAuthenticatedStatus();
  }, [])
  useEffect(() => {
    props.thunk_getMessages(props.match.params.id);
  },[]);
  useEffect(() => {
    const interval = setInterval(() => {

        console.log('getNewMessages = ', props.messages,' ',props.match.params.id)
        if (props.messages.length != 0) props.thunk_getNewMessages(props.match.params.id, props.messages[props.messages.length - 1].dateint)
        else  props.thunk_getNewMessages(props.match.params.id, 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.messages, props.match.params.id]);
  if (!((props.isAuthenticated)||(props.userAuthenticatedId == ''))) {
    return <Redirect to='/signup'></Redirect>
  } else
  return (
    <div>
      <Header
        isAuthenticated = {props.isAuthenticated}
        userAuthenticatedId = {props.userAuthenticatedId}
        logout = {props.thunk_logout}
      />
    <div className='sidebar-block-block'>
      <Sidebar
        userAuthenticatedId = {props.userAuthenticatedId}
      />
    </div>
      <MessagesPage
          messages = {props.messages}
          messageInput = {props.messageInput}
          updateMessageInput = {props.updateMessageInputAC}
          thunk_sendMessage = {props.thunk_sendMessage}
          params_id = {props.match.params.id}
          setScroll = {props.setScrollAC}
          scroll = {props.scroll}
      />
    </div>
  )
}

let mapStateToProps = (state) => {
  console.log(state)
  return {
    isAuthenticated: state.messagesReducer.isAuthenticated,
    userAuthenticatedId: state.messagesReducer.userAuthenticatedId,
    messageInput: state.messagesReducer.messageInput,
    messages: state.messagesReducer.messages,
    scroll: state.messagesReducer.scroll
  }
}

export default connect(mapStateToProps, {thunk_getAuthenticatedStatus, thunk_logout, thunk_getMessages, thunk_sendMessage, setScrollAC,
                                            updateMessageInputAC, thunk_getNewMessages})(MessagesPageContainer);
