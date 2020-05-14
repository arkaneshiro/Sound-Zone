import { SET_SOUND_IMG, SET_SOUND } from "../actions/soundActions";

export default function reducer(state = {}, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
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
