import axios from 'axios'

const SET_USER = 'SET_USER';
const SET_URL_ADRESS = 'SET_URL_ADRESS';
const MY_ACCOUNT = 'MY_ACCOUNT';
const SET_USER_AUTHENTICATED_ID = 'SET_USER_AUTHENTICATED_ID';
const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const NOT_FOUND = 'NOT_FOUND';
const UPDATE_NEW_POST_VALUE = 'UPDATE_NEW_POST_VALUE';
const ADD_USER_POSTS = 'ADD_USER_POSTS';
const SET_USER_POSTS = 'SET_USER_POSTS';
const SET_FOLLOWING = 'SET_FOLLOWING';
const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT';

const MY_IP = require('./../../../config').MY_IP;

let initialState = {
  isAuthenticated: false,
  myAccount: false,
  notFound: false,
  user: {},
  userAuthenticatedId: 0,
  URLAdress: '/account',
  newPostValue: '',
  posts : null,
  searchText: '',
  following: false
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
      debugger;
      let newPosts = JSON.parse(JSON.stringify(state.posts));
      // newPosts.unshift(state.posts);
      console.log('dispatchPosts = ',newPosts)

      newPosts.unshift(action.posts);
      console.log('dispatchPosts = ',newPosts);
      return {...state, posts: newPosts}
    }
    case SET_USER_POSTS: {
      return {...state, posts: action.posts}
    }
    case SET_FOLLOWING: {
      return {...state, following: action.following}
    }
    case UPDATE_SEARCH_TEXT: {
      return {...state, searchText: action.searchText}
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
const updateNewPostValueAC = (newPostValue) => ({type: UPDATE_NEW_POST_VALUE, newPostValue});
const addUserPostsAC = (posts) => ({type: ADD_USER_POSTS, posts : posts[0]});
const setUserPostsAC = (posts) => ({type: SET_USER_POSTS, posts});
const setFollowingAC = (following) => ({type: SET_FOLLOWING, following})

export {setUserAC};
export {setURLAdressAC};
export {myAccountAC};
export {setUserAuthenticatedIdAC};
export {isAuthenticatedAC};
export {notFoundAC};
export {updateNewPostValueAC};
export {addUserPostsAC};
export {setUserPostsAC};

// THUNKS
export const thunk_GetAccountInfo = (id) => {
  return (dispatch) => {
    // debugger;
    axios.get(`http://${MY_IP}:5003/api/account/${id}`, {
      withCredentials: true
    }).then(response => {
      // debugger;
      if (response.data.errorCode != 0) {
        console.log('НАДА NOT FOUND! ',);
        dispatch(notFoundAC(true));
      } else {
        console.log('ДАТА ПРИШЛА  ! ', response.data);

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

export const thunk_getUserPosts = (username) => {
  return (dispatch) => {

    let dataInJSON = {
      "username" : username
    }
    axios(`http://${MY_IP}:5003/api/getAllPosts`, {
      method: "post",
      data: dataInJSON,
      withCredentials: true
    }).then(data => {
      // console.log('++DATA + ++ ', data.data);
      dispatch(setUserPostsAC(data.data.posts));
    });
  }
}

export const thunk_getFollowing = (username) => {
  return (dispatch, getState) => {
    let dataInJSON = {
      "username" : username
    };
    axios(`http://${MY_IP}:5003/api/following`, {
      method: "post",
      data: dataInJSON,
      withCredentials: true
    }).then((data) => {
      debugger;
      dispatch(setFollowingAC(data.data.following));
    });
  }
}
export const thunk_addNewPost = () => {
  // debugger;

  return (dispatch, getState) => {
    debugger;
    console.log('NEWPOSTVALUEIFADDNEWPOST = ', getState() );
    let dataInJSON = {
      "newPostValue": getState().accountReducer.newPostValue
    }
    axios(`http://${MY_IP}:5003/api/newPostValue`, {
      method: "post",
      data: dataInJSON,
      withCredentials: true
    }).then((data) => {
      debugger;
      dispatch(addUserPostsAC(data.data.posts));
      dispatch(updateNewPostValueAC(''));
    })
  }
}

export const thunk_setFollowing = (newFollowing) => {
  return (dispatch, getState) => {
    let dataInJSON = {
      "username": getState().accountReducer.user.email,
      "newFollowing": newFollowing
    }
    console.log(getState().accountReducer);
    debugger;
    axios(`http://${MY_IP}:5003/api/setFollowing`, {
      method: "post",
      data: dataInJSON,
      withCredentials: true
    }).then(data => {
      dispatch(setFollowingAC(newFollowing));
    });
  }
}
export const thunk_logout = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/logout`,{
      withCredentials: true
    }).then((answer) => {
        console.log('answer = ',answer.data);
        dispatch(isAuthenticatedAC(false));
        dispatch(myAccountAC(false));
      }
    )
  }
}
