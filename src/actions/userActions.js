import { apiBaseUrl } from "../config";

// ACTIONS
export const SET_USER_INFO = 'soundzone/user/SET_USER_INFO';
export const GET_USER_IDS = 'soundzone/user/GET_USER_IDS';


export const setUserInfo = (userName, userBio, userImgUrl) => {
    return {
        type: SET_USER_INFO,
        userName,
        userBio,
        userImgUrl,
    }
}

export const getUserIds = (users) => {
    return {
        type: GET_USER_IDS,
        users
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

export const getAllUsers = (token) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/users/`);
        if (!res.ok) throw res;
        const data = await res.json();
        // console.log('THIS IS THE DATA')
        // console.log(data)
        dispatch(getUserIds(data.users))
    } catch (err) {
        console.error(err)
    }
}
