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

                               />  )

    } else {var PostsElements = 'NO POSTS'}
    return(
        <div className='MyPosts-block'>

            {PostsElements}

        </div>
    )
}

export default MyPosts;
