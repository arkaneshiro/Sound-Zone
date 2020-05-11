export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

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
