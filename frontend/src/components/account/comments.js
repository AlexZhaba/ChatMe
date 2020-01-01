import React from 'react';
import {NavLink} from 'react-router-dom';
const MY_IP = require('./../../../config').MY_IP;
let Comments = (props) => {
  var formatComments = props.comments.map(comment =>
    <div className='comment'>
      <div class='comment-img'>
          <div>
            <img src={`http://${MY_IP}:5003/api/avatar/${comment.commentator}@${Date.now()}`}/>
          </div>
      </div>
      <div className='cm'>
        <NavLink to={`/account/${comment.commentator}`}>
          <div className='commentator'>{comment.commentator}</div>
        </NavLink>
        {comment.commenttext}
      </div>
    </div>
  );
  return (
    <div>
      {formatComments}

    </div>
  )
}

export default Comments;
