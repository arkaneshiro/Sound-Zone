import { apiBaseUrl, cloudinaryPreset, cloudinaryUrl } from "../config";


// ACTIONS
export const SET_IMG = 'soundzone/authentication/SET_IMG';
export const SET_TOKEN = 'soundzone/authentication/SET_TOKEN';

export const setImgUrl = (newImgUrl) => {
    return {
        type: SET_IMG,
        newImgUrl,
    }
};

export const setToken = (authToken, currentUserId) => {
    return {
        type: SET_TOKEN,
        authToken,
        currentUserId
    }
};


// THUNKS
export const updateImg = (newImg) => async (dispatch) => {
    try {
        const data = new FormData();
        data.append('file', newImg);
        data.append('upload_preset', cloudinaryPreset);
        const res = await fetch(cloudinaryUrl, {
            method: "POST",
            body: data,
        });
        if (!res.ok) throw res;
        const imgObj = await res.json()
        dispatch(setImgUrl(imgObj.secure_url))
    } catch (err) {
        console.error(err);
    }
}

export const login = (loginUsername, password) => async (dispatch) => {
    try {
        const body = JSON.stringify({username: loginUsername, password})
        const res = await fetch(`${apiBaseUrl}/users/token`, {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw res;
        const { token, user: {id} } = await res.json();
        dispatch(setToken(token, id));
    } catch (err) {
        console.error(err);
    }
};


export const register = (username, email, password, bio, imgUrl) => async (dispatch) => {
    try {
        const body = JSON.stringify({ username, email, password, bio, imgUrl})
        const res = await fetch(`${apiBaseUrl}/users`, {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw res;
        const { token, user: {id} } = await res.json();
        dispatch(setToken(token, id));
    } catch (err) {
        console.error(err);
    }
};
