import { apiBaseUrl } from "../config";

export const SET_TOKEN = 'twitter/authentication/SET_TOKEN';
export const SET_USER_INFO = 'twitter/authentication/SET_USER_INFO';

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

export const register = (registerUsername, email, password, registerBio) => async (dispatch) => {
    try {
        const body = JSON.stringify({ username: registerUsername, email, password, bio: registerBio })
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
