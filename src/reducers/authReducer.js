import { SET_IMG, SET_TOKEN, SET_REGISTER_ERRORS, SET_LOGIN_ERROR, CLEAR_REGISTER_ERRORS, CLEAR_LOGIN_ERROR, LOGOUT } from "../actions/authActions";

const defaultAuthState = {
    authToken: null,
    currentUserId: null,
    previewImgUrl: 'https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589327406/Soundzone/default_avatar_avox09.jpg',
}

export default function reducer(state = {}, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SET_IMG: {
            return Object.assign(
                newState,
                {
                    previewImgUrl: action.newImgUrl,
                }
            )
        }
        case SET_TOKEN: {
            return Object.assign(
                newState,
                {
                    authToken: action.authToken,
                    currentUserId: action.currentUserId,
                }
            )
        }
        case SET_REGISTER_ERRORS: {
            return Object.assign(
                newState,
                {
                    registerErrors: action.registerErrors,
                }
            )
        }
        case SET_LOGIN_ERROR: {
            return Object.assign(
                newState,
                {
                    loginError: action.loginError,
                }
            )
        }
        case CLEAR_REGISTER_ERRORS: {
            return Object.assign(
                newState,
                {
                    registerErrors: [],
                }
            )
        }
        case CLEAR_LOGIN_ERROR: {
            return Object.assign(
                newState,
                {
                    loginError: [],
                }
            )
        }
        case LOGOUT: {
            return Object.assign(newState, defaultAuthState)
        }
        default: return state;
    }
}
