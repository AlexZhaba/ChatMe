import React, {useEffect} from 'react';

const MY_IP = require('./../../../config').MY_IP;

let MessagesPage = (props) => {
  let messagesBlock = <div>LOADING</div>;
  if (props.messages != null) {
      messagesBlock = props.messages.map(e => <div className='message'>
                                                  <div>
                                                    <img src={`http://${MY_IP}:5003/api/avatar/${e.user_from}@${123123}`}/>
                                                  </div>
                                                  <div className='message-text'>
                                                    {e.text}
                                                  </div>
                                                  <div className='message-user'>
                                                    {e.user_from}
                                                    <div className='message-time'>
                                                      {e.date}
                                                    </div>
                                                  </div>

                                              </div>)
  };
  useEffect( () => {
    // alert('Y')
    // if (props.scroll) {
      // props.setScroll(false);
      blockRef.current.scrollTop = 99999;
    // }
  },[props.messages]);
  let refMes = React.createRef();
  let blockRef = React.createRef();
  return (
    <div className='messages-wrapper'>
      <div  className='messages-block'>
        <div ref={blockRef} className='messages'>
          {messagesBlock}
        </div>
        <div className='message-input'>
          <input ref={refMes} type='text' placeholder='Your message' value={props.messageInput} onChange={(event) => props.updateMessageInput(event.target.value)}/>
        <div className='send-message' onClick={() => props.thunk_sendMessage(refMes.current.value, props.params_id)}>Send</div>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage;
