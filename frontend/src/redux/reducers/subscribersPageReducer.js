import axios from 'axios';


const SET_SUBSCRIBERS = 'SET_SUBSCRIBERS';

let initialState = {
    subscribers: [],
    userAuthenticatedId: ''
};

let subscribersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIBERS: {
            return {
                ...state,
                subscribers: action.subscribers
            }
        }
        default:
            return state;
    }
}

export default subscribersPageReducer;

export const setSubscribersAC = (subscribers) => ({type: SET_SUBSCRIBERS, subscribers});


export const thunk_getSubscribers = () => {
    return (dispatch) => {
        axios.get('http://localhost:5003/api/getSubscribers', {
            withCredentials: true
        }).then(data => {
            debugger;
            dispatch(setSubscribersAC(data.data.subscribers));
        });
    }
}
