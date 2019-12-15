import React from 'react';
import Post from './Post';
// import './AccountPage.css'
let MyPosts = (props) => {
    return(
        <div className='MyPosts-block'>
            <Post/>
            <Post/>
            <Post/>
        
        </div>
    )
}

export default MyPosts;