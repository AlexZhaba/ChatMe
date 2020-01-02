import axios from 'axios';
const SET_NEWS_IS_AUTHENTICATED = 'SET_NEWS_IS_AUTHENTICATED';
const SET_NEWS_USER_AUTHENTICATED_ID = 'SET_NEWS_USER_AUTHENTICATED_ID';
const UPDATE_NEWS_ACC = 'UPDATE_NEWS_ACC';
const SET_POSTS = 'SET_POSTS'
const SET_NEW_POSTS = 'SET_NEW_POSTS';
const COMBINE_POSTS = 'COMBINE_POSTS';
const UPDATE_LIMIT = 'UPDATE_LIMIT';

const MY_IP = require('./../../../config').MY_IP;

let initialState = {
  isAuthenticated: '',
  userAuthenticatedId: '',
  update: false,
  limitN : 10,
  posts: [],
  newPosts: []
}

let newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_USER_AUTHENTICATED_ID: {
      return {...state, userAuthenticatedId: action.userAuthenticatedId}
    }
    case SET_NEWS_IS_AUTHENTICATED: {
      return {...state, isAuthenticated: action.isAuthenticated}
    }
    case UPDATE_NEWS_ACC: {
      return {...state, update: action.update}
    }
    case SET_POSTS: {
      return {...state, posts: action.posts}
    }
    case SET_NEW_POSTS: {
      return {...state, newPosts: action.newPosts}
    }
    case COMBINE_POSTS: {
      return {
        ...state,
        posts: [...state.newPosts, ...state.posts],
        limitN: state.limitN + state.newPosts.length,
        newPosts : []
      }
    }
    case UPDATE_LIMIT: {
      if (state.posts.length == state.limitN) {
        return {
          ...state,
          limitN : state.limitN + 10
        }
      }
      return state;
    }
    default: {
      return state;
    }
  }
}

export default newsReducer;



export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_NEWS_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_NEWS_IS_AUTHENTICATED, isAuthenticated});
export const setUpdateAC = (update) => ({type: UPDATE_NEWS_ACC, update})
export const setPostsAC = (posts) => ({type: SET_POSTS, posts});
export const setNewPostsAC = (newPosts) => ({type: SET_NEW_POSTS, newPosts});
export const combinePostsAC = () => ({type: COMBINE_POSTS})
export const updateLimitAC = () => ({type: UPDATE_LIMIT})


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

export const thunk_getNews = (start) => {
  return (dispatch, getState) => {
    let posts = getState().newsReducer.posts;
    let lastDatePost;
    if (posts.length > 0) {
      lastDatePost = posts[0].dateint;
    }
    else lastDatePost = 10000000000000;
    let data = {
      "limitN" : getState().newsReducer.limitN,
      "lastDatePost": lastDatePost,
      "start" : start
    }
    axios(`http://${MY_IP}:5003/api/getNews`, {
      method: "post",
      data: data,
      withCredentials: true
    }).then(data => {
      console.log('НУ ВОТ НОВОСТИ КАРОЧЕ', data.data);
      debugger;
      if (start) {
        dispatch(setPostsAC(data.data.posts));
      } else {
        dispatch(setNewPostsAC(data.data.posts));
      }
    });
  }
}

export const thunk_onLike = (username, post_id, likesCount) => {
  return (dispatch) => {
    let data = {
      "username": username,
      "post_id": post_id,
      "likesCount": likesCount
    }
    axios(`http://${MY_IP}:5003/api/likePost`, {
      method: "post",
      data: data,
      withCredentials: true
    }).then(data => {
      // alert(data.data.message);
      dispatch(setUpdateAC(true));
    });
  }
}

export const thunk_getNewsAfterDate = () => {
  return (dispatch, getState) => {

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
