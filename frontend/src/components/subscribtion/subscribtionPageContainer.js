import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import {
    thunk_getSubscribtions
} from './../../redux/reducers/subscribtionReducer';
import SubscribtionPage from './subscribtionPage';

let SubscribtionsPageContainer = (props) => {
    useEffect(() => {
        console.log('UserID = ' + props.userAuthenticatedId)
        // if (props.userAuthenticatedId) {
            props.thunk_getSubscribtions();
        // }
    },[]);
    return (
        <div>
            <SubscribtionPage
                subscribtions = {props.subscribtions}
            />
        </div>
    );
}

let mapStateToProps = (state) => {
    debugger;
    return {
        subscribtions : state.subscribtionReducer.subscribtions,
        userAuthenticatedId : state.subscribtionReducer.userAuthenticatedId
    }
};

export default connect(mapStateToProps, {thunk_getSubscribtions})(SubscribtionsPageContainer);