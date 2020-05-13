import { apiBaseUrl, cloudinaryPreset, cloudinaryUrl } from "../config";

export const SET_IMG = 'twitter/authentication/SET_IMG';
export const SET_TOKEN = 'twitter/authentication/SET_TOKEN';
export const SET_USER_INFO = 'twitter/authentication/SET_USER_INFO';

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

export const setUserInfo = (currentUsername, currentUserBio, currentUserImgUrl) => {
    return {
        type: SET_USER_INFO,
        currentUsername,
        currentUserBio,
        currentUserImgUrl,
    }
}

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
        const {
            token,
            user: {
                id,
                username,
                bio,
                imgUrl,
            },
        } = await res.json();
        dispatch(setToken(token, id));
        dispatch(setUserInfo(username, bio, imgUrl))
    } catch (err) {
        console.error(err);
    }
};


export const register = (registerUsername, email, password, registerBio, newImg) => async (dispatch) => {
    try {
        const body = JSON.stringify({ username: registerUsername, email, password, bio: registerBio, imgUrl: newImg})
        console.log(body)
        const res = await fetch(`${apiBaseUrl}/users`, {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw res;

        const {
            token,
            user: {
                id,
                username,
                bio,
                imgUrl,
            },
        } = await res.json();

        dispatch(setToken(token, id));
        dispatch(setUserInfo(username, bio, imgUrl))
    } catch (err) {
        console.error(err);
    }
};
