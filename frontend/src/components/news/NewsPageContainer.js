import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  thunk_getAuthenticatedStatus,
  thunk_getNewsAfterDate,
  thunk_logout,
  thunk_onLike,
  setUpdateAC,
  combinePostsAC,
  thunk_getNews,
  updateLimitAC,
} from './../../redux/reducers/newsReducer'
import Header from './../header/Header';
import Sidebar from './../sidebar/sidebar'
import NewsPage from './NewsPage'
import {Redirect} from 'react-router-dom'

let NewsPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAuthenticatedStatus();
  },[]);
  useEffect(() => {
    props.thunk_getNews(true);
  },[]);
  // if (props.update) {
  //   // alert('UPDATE');
  //   setUpdateAC(false);
  //   props.thunk_getNews();
  // }
  useEffect(() => {
    const interval = setInterval(() => {
      //props.thunk_getNews(true);
      // alert('hELlo/')
      props.thunk_getNews(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  if (props.update) {
    props.thunk_getNews(true);
    props.setUpdateAC(false);
  }
  if (!((props.isAuthenticated)||(props.userAuthenticatedId == ''))) {
    return <Redirect to='/signup'></Redirect>
  }
  return (
    <div>
      {/* <Sidebar
        userAuthenticatedId = {props.userAuthenticatedId}
      /> */}
      <Header
        isAuthenticated = {props.isAuthenticated}
        userAuthenticatedId = {props.userAuthenticatedId}
        logout = {props.thunk_logout}
      />
    <NewsPage
      thunk_onLike = {props.thunk_onLike}
      posts = {props.posts}
      newPosts = {props.newPosts}
      combinePosts = {props.combinePostsAC}
      updateLimit = {props.updateLimitAC}
      setUpdateAC = {props.setUpdateAC}
      userAuthenticatedId = {props.userAuthenticatedId}

    />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.newsReducer.isAuthenticated,
    userAuthenticatedId: state.newsReducer.userAuthenticatedId,
    update: state.newsReducer.update,
    posts: state.newsReducer.posts,
    newPosts: state.newsReducer.newPosts
  }
}

export default connect(mapStateToProps, {setUpdateAC, thunk_getNews, thunk_getNewsAfterDate,updateLimitAC,
  thunk_getAuthenticatedStatus, thunk_logout, thunk_onLike, combinePostsAC})(NewsPageContainer);
