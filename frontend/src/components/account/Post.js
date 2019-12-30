import React from 'react';

const Post = (props) => {
    console.log('POST = ', props)
    return (
        <div className='post-block'>
            <div className='post-text'>
            {props.text}
            </div>
            <div className='bottom-post-block'>
                <div className='child-bottom-post-block'>
                    <div className='img-child-post' onClick={() => props.thunk_onLike(props.users_profile_id, props.post_id, props.likesCount)}>
                        {props.liked ?
                          <img src="https://img.icons8.com/ios-filled/50/000000/like.png"/> :
                           <img src="https://img.icons8.com/ios/50/000000/like.png"/> }
                    </div>
                    <div className='value-child-post' >
                        {props.likesCount}
                    </div>
                </div>
                <div className='child-bottom-post-block'>
                    <div className='img-child-post'>
                        <img src='https://image.flaticon.com/icons/png/512/1380/1380338.png'/>
                    </div>
                    <div className='value-child-post'>
                        {props.post_id}
                    </div>
                </div>
                 <div className='date-public-post-block'>
                    <div className='name-date'>
                        Date of public:
                    </div>
                    <div className='value-date'>
                        {props.datePublic}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post;
