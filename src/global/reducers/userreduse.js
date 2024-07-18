import actionTypes from "../actions/actionTypes";

const userDataState = {
    userData: null,
    userError: false,
};

export const userReducer = (state = userDataState, action) => {

    { console.log(action.payload?.users) }

    switch (action.type) {
        case actionTypes.USER_GET_REQUEST:
            return { ...state, isFetching: true, userError: false };
        case actionTypes.USER_GET_SUCCESS:
            return {
                ...state,
                userData: action.payload?.users,
                userError: false,
            };
        case actionTypes.USER_GET_FAILURE:
            return {
                ...state,
                userData: action.payload?.users,
                userError: true,
            };
        default:
            return state;
    }
};
