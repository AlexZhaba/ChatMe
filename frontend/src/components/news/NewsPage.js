import React from 'react';
import Post from './../account/Post';
import {useState} from 'react';
import './newsPageStyles.css';
let NewsPage = (props) => {

    // alert(props.posts.length + ' ++ ' + defaultPostsCount);
    let showNewPosts = () => {
      props.combinePosts();
      props.setUpdateAC(true);
    };
    let NewPostsBlock;
    if (props.newPosts.length != 0 ) {
      NewPostsBlock = <div className='newPostShowBlock'>
        New Posts ({props.newPosts.length})
        <div className='button-show-posts' onClick={showNewPosts}>
          Show
        </div>
      </div>
    } else {
      NewPostsBlock = <div className='newPostShowBlock'>


      </div>
    }
    if (props.posts.length != 0) {
        var PostsElements =
            props.posts.map( (p, i) => <Post
                                  text={p.text}
                                  datePublic = {p.publicdata}
                                  likesCount = {p.likescount}
                                  commentsCount = {p.commentscount}
                                  thunk_onLike = {props.thunk_onLike}
                                  post_id = {p.post_id}
                                  users_profile_id = {p.username}
                                  liked = {p.liked}
                                  key={i}
                                  imageCount = {p.imagecount}
                                  setUpdateAC = {props.setUpdateAC}
                                 />  )
    }

  return(
      <div>
          <div>
            {NewPostsBlock}
          </div>
          <div className='MyPosts-block'>

              {PostsElements}

          </div>
          <div onClick={props.updateLimit} className='newPostShowBlock'>

            <div className='button-show-posts' onClick={showNewPosts}>
            Загрузить ещё постов
            </div>
          </div>
      </div>
  )
}


export default NewsPage;
