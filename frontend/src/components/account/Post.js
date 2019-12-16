import React from 'react';

const Post = (props) => {
    console.log('POST = ', props)
    return (
        <div className='post-block'>
            <div className='post-text'>
            {props.text}
            {/* Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production */}
            {/* Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production
            Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production
            Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production
            Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production
            Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production
            Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production
            Hello everybody! Today i want to speak about Javascript. It’s really good language, but in future we can use TypeScript for production
             */}
            </div>
            <div className='bottom-post-block'>
                <div className='child-bottom-post-block'>
                    <div className='img-child-post'>
                        <img src='https://image.flaticon.com/icons/png/512/149/149217.png'/>
                    </div>
                    <div className='value-child-post'>
                        10
                    </div>
                </div>
                <div className='child-bottom-post-block'>
                    <div className='img-child-post'>
                        <img src='https://image.flaticon.com/icons/png/512/1380/1380338.png'/>
                    </div>
                    <div className='value-child-post'>
                        10
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