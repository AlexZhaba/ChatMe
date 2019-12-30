import axios from 'axios';


const SET_SUBSCRIBTIONS = 'SET_SUBSCRIBTIONS';
const SET_SUB_USER_AUTHENTICATED_ID = 'SET_SUB_USER_AUTHENTICATED_ID';
const SET_SUB_IS_AUTHENTICATED = 'SET_SUB_IS_AUTHENTICATED';

const MY_IP = require('./../../../config').MY_IP;

let initialState = {
    subscribtions: [],
    userAuthenticatedId: '',
    isAuthenticated: false
};

let subscribtionReducer = (state = initialState, action) => {
    console.log('ТИПБЛЯТЬ ' + action.type)
    switch (action.type) {
        case SET_SUBSCRIBTIONS: {
            return {
                ...state,
                subscribtions: action.subscribtions
            }
        }
        case SET_SUB_USER_AUTHENTICATED_ID: {
          return {...state, userAuthenticatedId: action.userAuthenticatedId}
        }
        case SET_SUB_IS_AUTHENTICATED: {
          return {...state, isAuthenticated: action.isAuthenticated}
        }
        default:
            return state;
    }
}

export default subscribtionReducer;

export const setSubscribtionsAC = (subscribtions) => ({type: SET_SUBSCRIBTIONS, subscribtions});
export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_SUB_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_SUB_IS_AUTHENTICATED, isAuthenticated});


export const thunk_getSubscribtions = () => {
    return (dispatch) => {
        axios.get(`http://${MY_IP}:5003/api/getSubscribtions`, {
            withCredentials: true
        }).then(data => {
            debugger;
            dispatch(setSubscribtionsAC(data.data.subscribtions));
        });
    }
}

export const thunk_getAuthenticatedStatus = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/getAuthenticatedStatus`, {
      withCredentials: true
    }).then(data => {
      //debugger;
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
