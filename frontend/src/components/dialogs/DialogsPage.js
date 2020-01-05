import React from 'react';
const MY_IP = require('./../../../config').MY_IP;
import {NavLink} from 'react-router-dom'
let MessagesPage = (props) => {
  let dialogsBlock = <div></div>
  if (props.dialogs != null) {
  dialogsBlock = props.dialogs.map(e =>   <NavLink to={`dialogs/${e.username_secondary}`}>
                                          <div className='dialog-block'>

                                                <div>
                                                  <img src={`http://${MY_IP}:5003/api/avatar/${e.username_secondary}@123123`}/>
                                                </div>
                                                <div>
                                                  {e.username_secondary}
                                                </div>

                                            </div>
                                          </NavLink>)
  }
  return (
    <div className='dialogs-block'>
      {dialogsBlock}
    </div>
  )
}

export default MessagesPage;
