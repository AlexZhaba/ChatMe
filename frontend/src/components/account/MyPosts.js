import React from 'react';
import Post from './Post';
// import './AccountPage.css'
let MyPosts = (props) => {
    console.log('MyPosts = ',props);
    debugger;
    let PostsElements = 
        props.posts.map( p => <Post newPostValue={p.newPostValue} datePublic = {p.datePublic} />  )
    return(
        <div className='MyPosts-block'>
            {PostsElements}
        
        </div>
    )
}

export default MyPosts;