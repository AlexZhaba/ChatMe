import axios from 'axios';
const SET_NEWS_IS_AUTHENTICATED = 'SET_NEWS_IS_AUTHENTICATED';
const SET_NEWS_USER_AUTHENTICATED_ID = 'SET_NEWS_USER_AUTHENTICATED_ID';
const UPDATE_NEWS_ACC = 'UPDATE_NEWS_ACC';
const SET_NEWS_POSTS = 'SET_NEWS_POSTS'

const MY_IP = require('./../../../config').MY_IP;
let initialState = {
  isAuthenticated: '',
  userAuthenticatedId: '',
  update: false,
  posts: null
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
    case SET_NEWS_POSTS: {
      return {...state, posts: action.posts}
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
export const setNewsPostsAC = (posts) => ({type: SET_NEWS_POSTS, posts});


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

export const thunk_getNews = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/getNews`, {
      withCredentials: true
    }).then(data => {
      console.log('НУ ВОТ НОВОСТИ КАРОЧЕ', data.data);
      dispatch(setNewsPostsAC(data.data.posts));
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
