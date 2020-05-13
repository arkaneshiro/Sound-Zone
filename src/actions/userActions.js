// import { apiBaseUrl, cloudinaryPreset, cloudinaryUrl } from "../config";

export const SET_USER_INFO = 'soundzone/user/SET_USER_INFO';

export const setUserInfo = (currentUsername, currentUserBio, currentUserImgUrl) => {
    return {
        type: SET_USER_INFO,
        currentUsername,
        currentUserBio,
        currentUserImgUrl,
    }
}

// export const receiveUserErrors = (errors) => ({
//   type: RECEIVE_USER_ERRORS,
//   errors,
// });

// example thunk action creator

// export const fetchUser = id => async dispatch => {
//     try {
//         const res = await fetch(`http://someapiendpoint/entity/${id}`)
//         if (!res.ok) throw res
//         const user = await res.json()
//         dispatch(user)
//     } catch (err){
//         const errors = err.json()
//         dispatch(receiveUserErrors(errors))
//     }
// }
