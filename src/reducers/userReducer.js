import { SET_USER_INFO } from "../actions/userActions";

export default (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SET_USER_INFO: {
            return Object.assign(
                newState,
                {
                    currentUsername: action.currentUsername,
                    currentUserBio: action.currentUserBio,
                    currentUserImgUrl: action.currentUserImgUrl,
                })
        }
        default:
            return newState;
    }
};
