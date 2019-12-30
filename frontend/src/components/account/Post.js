import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Comments from './comments'
const MY_IP = require('./../../../config').MY_IP;

const Post = (props) => {
    console.log('POST = ', props);
    const [showComment, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);
    const refComment = React.createRef();
    let sendComment = (profile_id, post_id, commentText) => {
      let data = {
        "profile_id" : profile_id,
        "post_id" : post_id,
        "commentText": commentText
      }
      axios(`http://${MY_IP}:5003/api/sendComment`, {
        method: "post",
        data: data,
        withCredentials: true
      }).then(data => {
        let newComments = comments;
        newComments.push(data.data.newComment);
        debugger;
        setComments(newComments);
        // alert(data.data.message);
        // setComments(data.data.comments);
      });
    }
    let openComments = () => {
      if (!showComment) {
        let data = {
          "profile_id": props.users_profile_id,
          "post_id": props.post_id
        }
        axios(`http://${MY_IP}:5003/api/getComments`, {
          method: "post",
          data: data,
          withCredentials: true
        }).then(data => {
          debugger;
          setComments(data.data.comments);
        })
      }
      setShowComment(!showComment);
    }
    // let formatComments = comments.map(comment => <div>{comment.commenttext}</div>);
    // var formatComments = comments.map(comment => <div>{comment.commentator}  {comment.commenttext}</div>);
    console.log(comments);
    useEffect(() => {
      setShowComment(false);
      // setComments([]);
    }, [props.users_profile_id]);
    debugger;
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
                    <div className='img-child-post' onClick={() => openComments()}>
                        <img src='https://image.flaticon.com/icons/png/512/1380/1380338.png'/>
                    </div>
                    <div className='value-child-post'>
                        {props.commentsCount}
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
            <div>
              {showComment ?
                <div className='comments-block'>
                  <Comments
                    comments = {comments}
                  />
                  {/* {formatComments} */}
                <div className='bottom-post'>
                    <input type='text' className='comment-input' placeholder='Your comment...' ref={refComment}/>
                  <div className='comment-button' onClick={() => sendComment(props.users_profile_id, props.post_id, refComment.current.value)}>
                      comment
                    </div>
                </div>
            </div>
              :
                <div>

                </div>}
            </div>
        </div>
    )
}

export default Post;
