import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import {
    thunk_getSubscribers
} from './../../redux/reducers/subscribersPageReducer';

let SubscriberPageContainer = (props) => {

    useEffect(() => {
        console.log('UserID = ' + props.userAuthenticatedId)
        // if (props.userAuthenticatedId) {
            props.thunk_getSubscribers();
        // }
    },[]);
    return (
        <div>
            ПОДПЕСЩЕКИ
            {props.subscribers}
        </div>
    );
}

let mapStateToProps = (state) => {
    debugger;
    return {
        subscribers : state.subscribersPageReducer.subscribers,
        userAuthenticatedId : state.subscribersPageReducer.userAuthenticatedId
    }
};

export default connect(mapStateToProps, {thunk_getSubscribers})(SubscriberPageContainer);