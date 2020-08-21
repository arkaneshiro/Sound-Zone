import { SET_USER_INFO, GET_USER_IDS, GET_FOLLOWED_IDS} from "../actions/userActions";


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
        case GET_USER_IDS: {
            return Object.assign(
                newState,
                {
                    searchData: action.users
                }
            )
        }
        case GET_FOLLOWED_IDS: {
            return Object.assign(
                newState,
                {
                    followedArray: action.ids
                }
            )
        }
        default:
            return newState;
    }
};
