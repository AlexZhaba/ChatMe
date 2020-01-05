import axios from 'axios';

const SET_MES_IS_AUTHENTICATED = 'SET_MES_IS_AUTHENTICATED';
const SET_MES_USER_AUTHENTICATED_ID = 'SET_MES_USER_AUTHENTICATED_ID';
const SET_MES_DIALOGS = 'SET_MES_DIALOGS';

const MY_IP = require('./../../../config').MY_IP;

let initialState = {
  isAuthenticated: false,
  userAuthenticatedId: '',
  dialogs: null
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MES_IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }
    }
    case SET_MES_USER_AUTHENTICATED_ID: {
      return {
        ...state,
        userAuthenticatedId: action.userAuthenticatedId
      }
    }
    case SET_MES_DIALOGS: {
      return {
        ...state,
        dialogs: action.dialogs
      }
    }
    default:
      return state;
  }
}

export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_MES_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_MES_IS_AUTHENTICATED, isAuthenticated});
export const setDialogsAC = (dialogs) => ({type: SET_MES_DIALOGS, dialogs})
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

export const thunk_getDialogs = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/getDialogs`, {
      withCredentials: true
    }).then(data => {
      console.log('НОВЫЕ ДИАЛОГИ - ', data.data.dialogs)
      dispatch(setDialogsAC(data.data.dialogs))
    })
  }
}

export default messagesReducer;
