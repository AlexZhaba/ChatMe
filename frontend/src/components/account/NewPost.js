import React from 'react';
import {useState, useEffect} from 'react';
let NewPost = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileURL, setSelectedFileURL] = useState(null);
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
    let ref_img = React.createRef();
    let UpdateInput = (event) => {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0]);
      var fr = new FileReader();
      fr.onload = () => {
        setSelectedFileURL(fr.result)
      }
      fr.readAsDataURL(event.target.files[0]);
    };
    console.log('NEWPOST_VALUE_REACT = ', props.newPostValue)


    return(
        <div className='new-post-block'>
            <div className='new-post-form'>
                <div>
                    <input  className='new-post-textarea'  placeholder='What is news?' value={props.newPostValue}
                    onChange={(event) => props.updateNewPostValue(event.target.value)}  onKeyDown={(event) => checkInput(event)}/>
                  {selectedFileURL ? <img className='post-img' ref={ref_img} src={selectedFileURL}/> : <div></div>}
                </div>
                <div className='bottom-new-post-form'>
                    <div className='button-add-post' onClick={() => {
                        setSelectedFile(null);
                        setSelectedFileURL(null);
                        props.thunk_addNewPost(selectedFile)
                      }}>
                        ADD POST
                    </div>
                    <div className='newpost-input-block'>
                      <input type='file' accept="image/jpeg, image/png" multiple onChange={(event) => UpdateInput(event)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NewPost;
