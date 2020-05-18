import { GET_USER_SOUNDS, GET_USER_FEED, GET_SOUND_DETAILS, SET_SOUND_IMG, SET_SOUND } from "../actions/soundActions";

export default function reducer(state = {}, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case GET_USER_SOUNDS: {
            return Object.assign(
                newState,
                {
                    userSoundsArray: action.userSoundsArray,
                })
        }
        case GET_USER_FEED: {
            return Object.assign(
                newState,
                {
                    userFeedArray: action.userFeedArray,
                })
        }
        case GET_SOUND_DETAILS: {
            return Object.assign(
                newState,
                {
                    soundDetails: action.soundDetails,
                })
        }
        case SET_SOUND_IMG: {
            return Object.assign(
                newState,
                {
                    newCoverUrl: action.newCoverUrl,
                })
        }
        case SET_SOUND: {
            return Object.assign(
                newState,
                {
                    newSoundUrl: action.newSoundUrl,
                    newWaveUrl: action.newWaveUrl,
                })
        }
        default:
            return state;
    }
}
