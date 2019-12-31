import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  thunk_getAuthenticatedStatus,
  thunk_logout,
  thunk_onLike,
  setUpdateAC,
  thunk_getNews
} from './../../redux/reducers/newsReducer'
import Header from './../header/Header';
import Sidebar from './../sidebar/sidebar'
import NewsPage from './NewsPage'


let NewsPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAuthenticatedStatus();
  },[]);
  useEffect(() => {
    props.thunk_getNews();
  },[])
  // if (props.update) {
  //   // alert('UPDATE');
  //   setUpdateAC(false);
  //   props.thunk_getNews();
  // }
  useEffect(() => {
    const interval = setInterval(() => {
      props.thunk_getNews();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <Sidebar
        userAuthenticatedId = {props.userAuthenticatedId}
      />
      <Header
        isAuthenticated = {props.isAuthenticated}
        userAuthenticatedId = {props.userAuthenticatedId}
        thunk_logout = {props.thunk_logout}
      />
    <NewsPage
      thunk_onLike = {props.thunk_onLike}
      posts = {props.posts}
    />
    </div>
  );
}

let mapStateToProps = (state) => {
  debugger;
  return {
    isAuthenticated: state.newsReducer.isAuthenticated,
    userAuthenticatedId: state.newsReducer.userAuthenticatedId,
    update: state.newsReducer.update,
    posts: state.newsReducer.posts
  }
}

export default connect(mapStateToProps, {setUpdateAC, thunk_getNews,
  thunk_getAuthenticatedStatus, thunk_logout, thunk_onLike})(NewsPageContainer);
