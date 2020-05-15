import { apiBaseUrl } from "../config";

// ACTIONS
export const SET_USER_INFO = 'soundzone/user/SET_USER_INFO';

export const setUserInfo = (userName, userBio, userImgUrl) => {
    return {
        type: SET_USER_INFO,
        userName,
        userBio,
        userImgUrl,
    }
}

// THUNKS
export const getUserInfo = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/users/${userId}`);
        if (!res.ok) throw res;
        const { user: { username, bio, imgUrl } } = await res.json();
        dispatch(setUserInfo(username, bio, imgUrl));
    } catch (err) {
        console.error(err);
    }
};
