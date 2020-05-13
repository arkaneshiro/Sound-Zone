import { SET_SOUND_IMG, } from "../actions/soundActions";

export default function reducer(state = {}, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SET_SOUND_IMG: {
            return Object.assign(
                newState,
                {
                    soundImgPreview: action.newImgUrl,
                })
        }
        default:
            return state;
    }
}
