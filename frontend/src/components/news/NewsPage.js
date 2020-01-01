import React from 'react';
import Post from './../account/Post';
import {useState} from 'react';
let NewsPage = (props) => {
  const [defaultPostsCount, setdefaultPostsCount ] = useState(null);
  const [posts, setPosts] = useState(null);

  const [newPostsCount, setNewPostsCount] = useState(null);
  const [newPosts, setNewPosts] = useState(null);
  let showNewPosts = () => {
    setPosts(props.posts);
    setdefaultPostsCount(props.posts.length);
  };
  debugger;
  if ((defaultPostsCount == null) && (props.posts != null) &&(defaultPostsCount != props.posts.length)) {
    debugger;
    setdefaultPostsCount(props.posts.length);
    setPosts(props.posts);
    setNewPosts(props.posts);
    debugger;
  }
  if (posts != null && newPosts != null) {
    debugger;
    if ((props.posts.length != defaultPostsCount) && (defaultPostsCount != null) && (newPosts.length != props.posts.length) && (props.posts.length != newPostsCount)) {
      debugger;
      setNewPosts(props.posts);
      setNewPostsCount(props.posts.length);
      // alert(props.posts.length, 'ROFL ', defaultPostsCount)
    }
    var NewPostsBlock;
    if (props.posts && defaultPostsCount != null) {
      if (props.posts.length - defaultPostsCount > 0) {
        // alert(props.posts.length - defaultPostsCount);
        var NewPostsBlock = <div>
                              НОВЫЕ ПОСТЫ ({props.posts.length - defaultPostsCount})
                              <div onClick={() => showNewPosts()}>
                                ПОКАЗАТЬ
                              </div>
                            </div>
      }
    }
    let p = props.posts.slice();
    console.log(props.posts.length - defaultPostsCount);
    for (let i = 1; i <= (props.posts.length - defaultPostsCount); i++) {
      p.shift();
    }
    // alert(props.posts.length + ' ++ ' + defaultPostsCount);
    var PostsElements =
        p.map( (p, i) => <Post
                              text={p.text}
                              datePublic = {p.publicdata}
                              likesCount = {p.likescount}
                              commentsCount = {p.commentscount}
                              thunk_onLike = {props.thunk_onLike}
                              post_id = {p.post_id}
                              users_profile_id = {p.username}
                              liked = {p.liked}
                              key={i}
                             />  )

  } else {var PostsElements = 'NO POSTS'}
  return(
      <div>
          <div>
            {NewPostsBlock}
          </div>
          <div className='MyPosts-block'>

              {PostsElements}

          </div>
      </div>
  )
}


export default NewsPage;
