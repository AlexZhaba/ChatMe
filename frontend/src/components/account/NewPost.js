import React from 'react';
let NewPost = (props) => {
    const checkInput = (event) => {
        // console.log(event.target.style);
        event.persist();
        const MIN_HEIGHT = '50px';

        // console.log(event);
        if (event.target.style.height == '') {
            event.target.style.height = MIN_HEIGHT;
        }

        // // console.log(event.target.style.height.slice(0, event.target.style.height.length - 2) );
        // // console.log(event.target.style)
        if (event.keyCode == 13) {
            event.target.style.height = (+event.target.style.height.slice(0, event.target.style.height.length - 2) + 19).toString() + 'px';
        }
        // if (event.keyCode == 8) {
            
        //     event.target.style.height = (+event.target.style.height.slice(0, event.target.style.height.length - 2) - 20).toString() + 'px';
        }
        console.log('NewPost = ' +  props.addNewPost);
    let myRef = React.createRef();
    debugger;
    console.log('NEWPOST_VALUE_REACT = ', props.newPostValue)
    return(
        <div className='new-post-block'>
            <div className='new-post-form'>
                <div>
                    <input  className='new-post-textarea'  placeholder='What is news?' value={props.newPostValue}
                    onChange={(event) => props.updateNewPostValue(event.target.value)}  onKeyDown={(event) => checkInput(event)}/>
                </div>
                <div className='bottom-new-post-form'>
                    <div className='button-add-post' onClick={() => props.thunk_addNewPost()}>
                        ADD POST
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NewPost;