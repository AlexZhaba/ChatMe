import axios from 'axios';

const SET_MESS_IS_AUTHENTICATED = 'SET_MESS_IS_AUTHENTICATED';
const SET_MESS_USER_AUTHENTICATED_ID = 'SET_MESS_USER_AUTHENTICATED_ID';
const SET_MESSAGES = 'SET_MESSAGES';
const UPDATE_MESSAGE_INPUT = 'UPDATE_MESSAGE_INPUT';
const SET_SCROLL = 'SET_SCROLL';
const COMBINE_MESSAGES = 'COMBINE_MESSAGES';
const MY_IP = require('./../../../config').MY_IP;

let initialState = {
  messages: null,
  messageInput: '',
  scroll: true
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESS_IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }
    }
    case SET_MESS_USER_AUTHENTICATED_ID: {
      return {
        ...state,
        userAuthenticatedId: action.userAuthenticatedId
      }
    }
    case SET_MESSAGES: {
      return {
        ...state,
        messages: action.messages
      }
    }
    case UPDATE_MESSAGE_INPUT: {
      return {
        ...state,
        messageInput: action.messageInput
      }
    }
    case SET_SCROLL : {
      return {
        ...state,
        scroll: action.scroll
      }
    }
    case COMBINE_MESSAGES : {
      return {
        ...state,
        messages: [...state.messages, ...action.messages]
      }
    }
    default:
        return state;
  }
}

export default messagesReducer;


export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_MESS_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_MESS_IS_AUTHENTICATED, isAuthenticated});
export const setMessagesAC = (messages) => ({type: SET_MESSAGES, messages})
export const setScrollAC = (scroll) => ({type: SET_SCROLL, scroll})
export const combineMessagesAC = (messages) => ({type: COMBINE_MESSAGES, messages})
export const updateMessageInputAC = (messageInput) => ({type: UPDATE_MESSAGE_INPUT, messageInput})
export const thunk_getAuthenticatedStatus = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/getAuthenticatedStatus`, {
      withCredentials: true
    }).then(data => {
      dispatch(isAuthenticatedAC(data.data.isAuthenticated));
      dispatch(setUserAuthenticatedIdAC(data.data.userAuthenticatedId));
    })
  }
}
export const thunk_logout = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/logout`,{
      withCredentials: true
    }).then((answer) => {
        console.log('answer = ',answer.data);
        dispatch(isAuthenticatedAC(false));
        dispatch(setUserAuthenticatedIdAC(''));

      }
    )
  }
}

export const thunk_getMessages = (id) => {
  return (dispatch) => {
    let data = {
      id
    }
    axios(`http://${MY_IP}:5003/api/getMessages`, {
      method: "post",
      data: data,
      withCredentials: true
    }).then(data => {
      // alert(data.data.messages);
      dispatch(setMessagesAC(data.data.messages));
    })
  };
}

export const thunk_getNewMessages = (id, lastDate) => {
  return (dispatch) => {
    let data = {
      id,
      lastDate
    }
    axios(`http://${MY_IP}:5003/api/getNewMessages`, {
      method: "post",
      data: data,
      withCredentials: true
    }).then(data => {
      if (data.data.newMessages.length > 0) dispatch(combineMessagesAC(data.data.newMessages));
    });
  }
}

export const thunk_sendMessage = (text, user_to) => {
  return (dispatch, getState) => {
    let data = {
      text,
      user_to,
      messagesCount: getState().messagesReducer.messages.length
    }
    dispatch(updateMessageInputAC(''));
    axios(`http://${MY_IP}:5003/api/sendMessage`, {
      method: "post",
      data: data,
      withCredentials: true
    }).then(data => {
      dispatch(setScrollAC(true));
      // alert(data.data.data);
    });
  }
};
