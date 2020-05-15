import { SET_USER_INFO } from "../actions/userActions";

export default (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SET_USER_INFO: {
            return Object.assign(
                newState,
                {
                    userName: action.userName,
                    userBio: action.userBio,
                    userImgUrl: action.userImgUrl,
                })
        }
        default:
            return newState;
    }
};
