import axios from 'axios';


const SET_SUBSCRIBTIONS = 'SET_SUBSCRIBTIONS';

let initialState = {
    subscribtions: [],
    userAuthenticatedId: ''
};

let subscribtionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIBTIONS: {
            return {
                ...state,
                subscribtions: action.subscribtions
            }
        }
        default:
            return state;
    }
}

export default subscribtionReducer;

export const setSubscribtionsAC = (subscribtions) => ({type: SET_SUBSCRIBTIONS, subscribtions});


export const thunk_getSubscribtions = () => {
    return (dispatch) => {
        axios.get('http://localhost:5003/api/getSubscribtions', {
            withCredentials: true
        }).then(data => {
            debugger;
            dispatch(setSubscribtionsAC(data.data.subscribtions));
        });
    }
}
