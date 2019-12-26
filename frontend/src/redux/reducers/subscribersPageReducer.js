import axios from 'axios';


const SET_SUBSCRIBERS = 'SET_SUBSCRIBERS';
const SET_SUBB_IS_AUTHENTICATED = 'SET_SUBB_IS_AUTHENTICATED';
const SET_SUBB_USER_AUTHENTICATED_ID = 'SET_SUBB_USER_AUTHENTICATED_ID';

let initialState = {
    subscribers: [],
    userAuthenticatedId: '',
    isAuthenticated: false
};

let subscribersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIBERS: {
            return {
                ...state,
                subscribers: action.subscribers
            }
        }
        case SET_SUBB_USER_AUTHENTICATED_ID: {
          return {...state, userAuthenticatedId: action.userAuthenticatedId}
        }
        case SET_SUBB_IS_AUTHENTICATED: {
          return {...state, isAuthenticated: action.isAuthenticated}
        }
        default:
            return state;
    }
}

export default subscribersPageReducer;

export const setSubscribersAC = (subscribers) => ({type: SET_SUBSCRIBERS, subscribers});
export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_SUBB_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_SUBB_IS_AUTHENTICATED, isAuthenticated});

export const thunk_getSubscribers = () => {
    return (dispatch) => {
        axios.get('http://localhost:5003/api/getSubscribers', {
            withCredentials: true
        }).then(data => {
            debugger;
            dispatch(setSubscribersAC(data.data.subscribers));
        });
    }
}
export const thunk_getAuthenticatedStatus = () => {
  return (dispatch) => {
    axios.get('http://localhost:5003/api/getAuthenticatedStatus', {
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
    axios.get('http://localhost:5003/api/logout',{
      withCredentials: true
    }).then((answer) => {
        console.log('answer = ',answer.data);
        dispatch(isAuthenticatedAC(false));
      }
    )
  }
}
