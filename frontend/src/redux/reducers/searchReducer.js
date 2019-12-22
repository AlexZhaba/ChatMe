import axios from 'axios';

const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT'
const SET_SRC_IS_AUTHENTICATED = 'SET_SRC_IS_AUTHENTICATED';
const SET_SRC_USER_AUTHENTICATED_ID = 'SET_SRC_USER_AUTHENTICATED_ID';
const SET_SEARCH_USERS = 'SET_SEARCH_USERS';
let initialState = {
  searchText: '',
  isAuthenticated: false,
  userAuthenticatedId : '',
  fetching: false,
  lastFetchText: '',
  searchUsers: []
}

let searchReducer = (state = initialState, action) => {
  console.log('action = ',action)
  switch (action.type) {
    case UPDATE_SEARCH_TEXT: {
      return {...state, searchText: action.searchText}
    }
    case SET_SRC_USER_AUTHENTICATED_ID: {
      return {...state, userAuthenticatedId: action.userAuthenticatedId}
    }
    case SET_SRC_IS_AUTHENTICATED: {
      return {...state, isAuthenticated: action.isAuthenticated}
    }
    case SET_SEARCH_USERS: {
      return {...state, searchUsers: action.searchUsers}
    }
    default:
      return state;
  }
}

export default searchReducer;

export const updateSearchTextAC = (searchText) => ({type: UPDATE_SEARCH_TEXT, searchText})
export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_SRC_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_SRC_IS_AUTHENTICATED, isAuthenticated});
export const setSearchUsersAC = (searchUsers) =>  ({type: SET_SEARCH_USERS, searchUsers});


export const thunk_getAuthenticatedStatus = () => {
  return (dispatch) => {
    axios.get('http://localhost:5003/api/getAuthenticatedStatus', {
      withCredentials: true
    }).then(data => {
      debugger;
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


export const thunk_searchUsers = (searchText) => {
  return (dispatch) => {
    axios.post('http://localhost:5003/api/searchUsers', {
      searchText: searchText
    }).then(data => {
      dispatch(setSearchUsersAC(data.data.searchUsers));
    });
  }
}
