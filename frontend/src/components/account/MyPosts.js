import React from 'react';
import Post from './Post';
// import './AccountPage.css'
let MyPosts = (props) => {
    console.log('MyPosts = ',props)
    if (props.posts != null) {
      var PostsElements =
          props.posts.map( p => <Post
                                text={p.text}
                                datePublic = {p.publicdata}
                                likesCount = {p.likescount}
                                thunk_onLike = {props.thunk_onLike}
                                post_id = {p.post_id}
                                users_profile_id = {props.users_profile_id}
                                liked = {p.liked}
                               />  )

    } else {var PostsElements = 'NO POSTS'}
    return(
        <div className='MyPosts-block'>

            {PostsElements}

        </div>
    )
}

export default MyPosts;
