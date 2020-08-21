import { apiBaseUrl } from "../config";

// ACTIONS
export const SET_USER_INFO = 'soundzone/user/SET_USER_INFO';
export const GET_USER_IDS = 'soundzone/user/GET_USER_IDS';
export const GET_FOLLOWED_IDS = 'soundzone/user/GET_FOLLOWED_IDS';


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

export const getFollowedIds = (ids) => {
    return {
        type: GET_FOLLOWED_IDS,
        ids
    }
}

// THUNKS
export const getUserInfo = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/users/${userId}/getUserInfo`);
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
        dispatch(getUserIds(data.users))
    } catch (err) {
        console.error(err)
    }
}

export const getFollowedUsers = (token) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/users/followed`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        const data = await res.json();
        const followIdArray = data.map(follow => follow.id)
        dispatch(getFollowedIds(followIdArray))
    } catch (err) {
        console.error(err)
    }
}

export const followUser = (token, followerId, followedId) => async (dispatch) => {
    try {
        const body = JSON.stringify({ followerId, followedId })
        const res = await fetch(`${apiBaseUrl}/users/follow`, {
            method: "POST",
            body,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        const data = await res.json();
        const followIdArray = data.map(follow => follow.id)
        // console.log(followIdArray)
        dispatch(getFollowedIds(followIdArray))
    } catch (err) {
        console.error(err)
    }
}

export const unFollowUser = (token, followerId, followedId) => async (dispatch) => {
    try {
        const body = JSON.stringify({ followerId, followedId })
        const res = await fetch(`${apiBaseUrl}/users/unfollow`, {
            method: "DELETE",
            body,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        dispatch(getFollowedUsers(token))
    } catch (err) {
        console.error(err)
    }
}
