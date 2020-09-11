const { apiBaseUrl, cloudinaryUrl, cloudinaryPreset, } = require("../config");

// ACTIONS
export const GET_USER_SOUNDS = 'soundzone/sound/GET_USER_SOUNDS'
export const GET_USER_FEED = 'soundzone/sound/GET_USER_FEED'
export const GET_SOUND_DETAILS = 'soundzone/sound/GET_SOUND_DETAILS'
export const SET_SOUND_IMG = 'soundzone/sound/SET_SOUND_IMG';
export const SET_SOUND = 'soundzone/sound/SET_SOUND_WAVE';

export const getUserSounds = (userSoundsArray) => {
    return {
        type: GET_USER_SOUNDS,
        userSoundsArray,
    }
};

export const getUserFeed= (userFeedArray) => {
    return {
        type: GET_USER_FEED,
        userFeedArray,
    }
};

export const getSoundDetails= (soundDetails) => {
    return {
        type: GET_SOUND_DETAILS,
        soundDetails,
    }
};

export const setCoverImgUrl = (newCoverUrl) => {
    return {
        type: SET_SOUND_IMG,
        newCoverUrl,
    }
};

export const setSound = (url) => {
    const waveUrlFront = url.substring(0, url.lastIndexOf('upload/') + 7);
    const waveUrlBack = url.substring(url.lastIndexOf('/'), url.length - 4);
    const waveUrl = `${waveUrlFront}fl_waveform,co_black,b_white${waveUrlBack}.png`;
    return {
        type: SET_SOUND,
        newSoundUrl: url,
        newWaveUrl: waveUrl,
    }
};

// THUNKS
export const fetchUserSounds = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/users/${userId}/sounds`);
        if (!res.ok) throw res;
        const {sounds} = await res.json();
        dispatch(getUserSounds(sounds));
    } catch (err) {
        console.error(err);
    }
};

export const fetchUserFeed = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/users/${userId}/feed`);
        if (!res.ok) throw res;
        const {sounds} = await res.json();
        dispatch(getUserFeed(sounds));
    } catch (err) {
        console.error(err);
    }
};

export const fetchSound = (soundId) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/sounds/${soundId}`);
        if (!res.ok) throw res;
        const {sound} = await res.json();
        dispatch(getSoundDetails(sound));
    } catch (err) {
        console.error(err);
    }
};

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
        dispatch(setSound(url));
    } catch (err) {
        console.error(err);
    }
}

export const uploadSound = (userId, soundUrl, waveUrl, imageUrl, description, name, token) => async (dispatch) => {
    try {
        const body = JSON.stringify({ userId, soundUrl, waveUrl, imageUrl, description, name })
        const res = await fetch(`${apiBaseUrl}/sounds`, {
            method: "POST",
            body,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        // const soundObj = await res.json();
        // console.log(soundObj)
        window.location.href = `/users/${userId}`;
    } catch (err) {
        console.error(err);
    }
};

export const deleteSound = (token, soundId, userId) => async (dispatch) => {
    try {
        const res = await fetch (`${apiBaseUrl}/sounds/${soundId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!res.ok) throw res;
        // const deleteMessage = await res.json();
        // console.log(deleteMessage)
        dispatch(fetchUserSounds(userId))
        dispatch(fetchUserFeed(userId))
    } catch (err) {
        console.error(err);
    }
}
