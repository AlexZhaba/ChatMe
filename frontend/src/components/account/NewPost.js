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
    return(
        <div className='new-post-block'>
            <div className='new-post-form'>
                <div>
                    <textarea className='new-post-textarea'  placeholder='What is news?' 
                    onChange={(event) => props.updateNewPostValue(event.target.value)} value = {props.value} onKeyDown={(event) => checkInput(event)}></textarea>
                </div>
                <div className='bottom-new-post-form'>
                    <div className='button-add-post' onClick={() => props.thunk_addNewPost('HELL OWORLD ')}>
                        ADD POST
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NewPost;