// import action type constants from necessary action file/s
import { SET_TOKEN, SET_USER_INFO } from "../actions/authActions";

const defaultAuthState = {
    authToken: null,
    currentUserId: null,
}

export default function reducer(state = defaultAuthState, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
      case SET_TOKEN: {
        return Object.assign(
            newState,
            {
                authToken: action.authToken,
                currentUserId: action.currentUserId,
            })
      }
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
        return state;
    }
}
