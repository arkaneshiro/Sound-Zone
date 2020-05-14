const { cloudinaryUrl, cloudinaryPreset, } = require("../config");

// ACTIONS
export const SET_SOUND_IMG = 'soundzone/sound/SET_SOUND_IMG';
export const SET_SOUND_WAVE = 'soundzone/sound/SET_SOUND_WAVE';
export const SET_SOUND = 'soundzone/sound/SET_SOUND_WAVE';

export const setCoverImgUrl = (newCoverUrl) => {
    return {
        type: SET_SOUND_IMG,
        newCoverUrl,
    }
};

export const setSound = (url) => {
    const waveUrlFront = url.substring(0, url.lastIndexOf('upload/') + 7);
    const waveUrlBack = url.substring(url.lastIndexOf('/'), url.length - 4);
    const waveUrl = `${waveUrlFront}h_200,w_500,fl_waveform,co_black,b_white${waveUrlBack}.png`;
    return {
        type: SET_SOUND,
        newSoundUrl: url,
        newWaveUrl: waveUrl,
    }
};

// THUNKS
export const updateCoverImg = (newImg) => async (dispatch) => {
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
        dispatch(setCoverImgUrl(imgObj.secure_url));
    } catch (err) {
        console.error(err);
    }
}

export const updateSound = (sound) => async (dispatch) => {
    try {
        const data = new FormData();
        data.append('file', sound);
        data.append('upload_preset', cloudinaryPreset);
        const res = await fetch(`${cloudinaryUrl}/video/upload`, {
            method: "POST",
            body: data,
        });
        if (!res.ok) throw res;
        const soundObj = await res.json()
        const url = soundObj.secure_url;
        const waveUrlFront = url.substring(0, url.lastIndexOf('upload/') + 7);
        const waveUrlBack = url.substring(url.lastIndexOf('/'), url.length - 4);
        const waveUrl = `${waveUrlFront}h_200,w_500,fl_waveform,co_black,b_white${waveUrlBack}.png`;
        console.log(waveUrl)
        dispatch(setSound(url));
    } catch (err) {
        console.error(err);
    }
}
