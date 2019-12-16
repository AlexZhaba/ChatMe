import React from 'react';
import Post from './Post';
// import './AccountPage.css'
let MyPosts = (props) => {
    console.log('MyPosts = ',props)
    let PostsElements = 
        props.posts.map( p => <Post 
                                text={p.text} 
                                datePublic = {p.publicdata} 

                               />  )
    return(
        <div className='MyPosts-block'>
            {PostsElements}
        
        </div>
    )
}

export default MyPosts;