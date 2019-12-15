import axios from 'axios'

const SET_USER = 'SET_USER';
const SET_URL_ADRESS = 'SET_URL_ADRESS';
const MY_ACCOUNT = 'MY_ACCOUNT';
const SET_USER_AUTHENTICATED_ID = 'SET_USER_AUTHENTICATED_ID';
const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const NOT_FOUND = 'NOT_FOUND';
const UPDATE_NEW_POST_VALUE = 'UPDATE_NEW_POST_VALUE';
const ADD_USER_POSTS = 'ADD_USER_POSTS';

let initialState = {
  isAuthenticated: false,
  myAccount: false,
  notFound: false,
  user: {},
  userAuthenticatedId: 0,
  URLAdress: '/account',
  newPostValue: '',
  posts : []
};
//          REDUCER

const accountReducer = (state = initialState, action) => {
  console.log('type = ',  action);
  switch(action.type) {
    case SET_USER: {
      return {...state, user: action.user};
    }
    case SET_URL_ADRESS: {
      return {...state, URLAdress : action.URLAdress}
    }
    case SET_USER_AUTHENTICATED_ID: {
      return {...state, userAuthenticatedId: action.userAuthenticatedId}
    }
    case MY_ACCOUNT: {
      return {...state, myAccount: action.myAccount}
    }
    case NOT_FOUND: {
      return {...state, notFound : action.notFound}
    }
    case IS_AUTHENTICATED: {
      return {...state, isAuthenticated: action.isAuthenticated}
    }
    case UPDATE_NEW_POST_VALUE: {
      return {...state, newPostValue: action.newPostValue}
    }
    case ADD_USER_POSTS: {
      return {...state, posts: action.posts}
    }
    default:
      return state;
  }
}
export default accountReducer;

//                 ACTION CREATORS
const setUserAC = (user) => ({type: SET_USER, user});
const setURLAdressAC = (URLAdress) => ({type: SET_URL_ADRESS, URLAdress});
const myAccountAC = (myAccount) => ({type: MY_ACCOUNT, myAccount});
const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_USER_AUTHENTICATED_ID, userAuthenticatedId});
const isAuthenticatedAC = (isAuthenticated) => ({type: IS_AUTHENTICATED, isAuthenticated});
const notFoundAC = (notFound) => ({type: NOT_FOUND, notFound});
const updateNewPostValueAC = (value) => ({type: UPDATE_NEW_POST_VALUE, value});
const addUserPostsAC = (posts) => ({type: ADD_USER_POSTS, posts});

export {setUserAC};
export {setURLAdressAC};
export {myAccountAC};
export {setUserAuthenticatedIdAC};
export {isAuthenticatedAC};
export {notFoundAC};
export {updateNewPostValueAC};
export {addUserPostsAC};


// THUNKS
export const thunk_GetAccountInfo = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:5003/api/account/${id}`, {
      withCredentials: true
    }).then(response => {
      if (response.data.errorCode != 0) {
        console.log('НАДА NOT FOUND! ',);
        dispatch(notFoundAC(true));
      } else {
        console.log('ДАТА ПРИШЛА! ', response.data);
        console.log('----- ', isAuthenticatedAC(response.data.isAuthenticated));
        dispatch(isAuthenticatedAC(response.data.isAuthenticated));
        dispatch(myAccountAC(response.data.myAccount));
        dispatch(setUserAC(response.data.user));
        dispatch(setUserAuthenticatedIdAC(response.data.userAuthenticatedId));
        dispatch(notFoundAC(false));
       }
    });
  }
};

export const thunk_addNewPost = (newPostValue) => {
  debugger;
  let dataInJSON = {
    newPostValue
  }
  return (dispatch) => {
    axios('http://localhost:5003/api/newPostValue', {
      method: "post",
      data: dataInJSON,
      withCredentials: true
    }).then((data) => {
      debugger;
      dispatch(addUserPostsAC(data.data.posts));
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
        dispatch(myAccountAC(false));
      }
    )
  }
}
