const { cloudinaryUrl, cloudinaryPreset, } = require("../config");

// ACTIONS
export const SET_SOUND_IMG = 'soundzone/sound/SET_SOUND_IMG';

export const setSoundImgUrl = (newImgUrl) => {
    return {
        type: SET_SOUND_IMG,
        newImgUrl,
    }
};

// THUNKS
export const updateSoundImg = (newImg) => async (dispatch) => {
    try {
        const data = new FormData();
        data.append('file', newImg);
        data.append('upload_preset', cloudinaryPreset);
        const res = await fetch(`${cloudinaryUrl}/image/upload`, {
            method: "POST",
            body: data,
        });
        if (!res.ok) throw res;
        const imgObj = await res.json()
        dispatch(setSoundImgUrl(imgObj.secure_url))
    } catch (err) {
        console.error(err);
    }
}
