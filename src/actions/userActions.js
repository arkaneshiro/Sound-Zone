import { apiBaseUrl } from "../config";

// ACTIONS
export const SET_USER_INFO = 'soundzone/user/SET_USER_INFO';

export const setUserInfo = (currentUsername, currentUserBio, currentUserImgUrl) => {
    return {
        type: SET_USER_INFO,
        currentUsername,
        currentUserBio,
        currentUserImgUrl,
    }
}

// THUNKS
export const getUserInfo = (id) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/users/${id}`);
        if (!res.ok) throw res;
        const { user: { username, bio, imgUrl } } = await res.json();
        dispatch(setUserInfo(username, bio, imgUrl));
    } catch (err) {
        console.error(err);
    }
};
