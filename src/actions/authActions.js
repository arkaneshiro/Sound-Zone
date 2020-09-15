const { apiBaseUrl, cloudinaryUrl, cloudinaryPreset, } = require("../config");

// ACTIONS
export const SET_IMG = 'soundzone/authentication/SET_IMG';
export const SET_TOKEN = 'soundzone/authentication/SET_TOKEN';
export const SET_REGISTER_ERRORS = 'soundzone/authentication/SET_REGISTER_ERRORS';
export const CLEAR_REGISTER_ERRORS = 'soundzone/authentication/CLEAR_REGISTER_ERRORS';
export const LOGOUT = 'soundzone/authentication/LOGOUT';

export const setImgUrl = (newImgUrl) => {
    return {
        type: SET_IMG,
        newImgUrl,
    }
};

export const persistUser = (token, id) => {
    localStorage.setItem('soundzone-credentials', token)
    localStorage.setItem('soundzone-user', id)
};

export const removeUser = () => {
    localStorage.removeItem('soundzone-credentials');
    localStorage.removeItem('soundzone-user');
};

export const setToken = (authToken, currentUserId) => {
    return {
        type: SET_TOKEN,
        authToken,
        currentUserId,
    }
};

export const setRegisterErrors = (registerErrors) => {
    return {
        type: SET_REGISTER_ERRORS,
        registerErrors,
    }
}

export const clearRegisterErrors = () => {
    return {
        type: CLEAR_REGISTER_ERRORS,
    }
};

export const logout = () => {
    removeUser();
    return {
        type: LOGOUT,
    }
};

// THUNKS
export const updateImg = (newImg) => async (dispatch) => {
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
        persistUser(token, id);
        dispatch(setToken(token, id));
    } catch (err) {
        console.error(err);
    }
};

export const registerUser = (username, email, password, bio, imgUrl) => async (dispatch) => {
    try {
        const body = JSON.stringify({ username, email, password, bio, imgUrl})
        const res = await fetch(`${apiBaseUrl}/users`, {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw res;
        const { token, user: {id} } = await res.json();
        persistUser(token, id);
        dispatch(setToken(token, id));
    } catch (err) {
        // console.error(err);
        if ((err.status >= 400 && err.status <= 600) ) {
            const errorJson = await err.json();
            const formattedErr = errorJson.errors.reduce((obj, error) => {
                return {
                    ...obj,
                    [error.param]: {param: error.param, value: error.value, msg: error.msg},
                };
            }, {})
            dispatch(setRegisterErrors(formattedErr))
        }
    }
};
