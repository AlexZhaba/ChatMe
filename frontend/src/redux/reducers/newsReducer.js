import axios from 'axios';
const SET_NEWS_IS_AUTHENTICATED = 'SET_NEWS_IS_AUTHENTICATED';
const SET_NEWS_USER_AUTHENTICATED_ID = 'SET_NEWS_USER_AUTHENTICATED_ID';


let initialState = {
  isAuthenticated: '',
  userAuthenticatedId: ''
}

let newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_USER_AUTHENTICATED_ID: {
      return {...state, userAuthenticatedId: action.userAuthenticatedId}
    }
    case SET_NEWS_IS_AUTHENTICATED: {
      return {...state, isAuthenticated: action.isAuthenticated}
    }
    default: {
      return state;
    }
  }
}

export default newsReducer;



export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_NEWS_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_NEWS_IS_AUTHENTICATED, isAuthenticated});


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
