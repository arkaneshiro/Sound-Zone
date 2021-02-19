# Soundzone
*[Soundzone](https://sound-zone.herokuapp.com) by [Riki Kaneshiro](https://arkaneshiro.github.io/)*

**Table of Contents**
* [Soundzone at a Glance](#soundzone-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-further-development)

## Soundzone at a Glance
Soundzone is a web application based on Soundcloud where users can upload and play sounds, and follow other users to play their sounds.

Users can click through the waveform of a sound to scrub through playback of sounds.

##### Playback Navigation
![Playback Navigation](/Documentation/readme-resources/playback_navigation.gif)

## Application Architecture
Soundzone's stack includes [React](https://reactjs.org/), [Redux](https://redux.js.org/), [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), and [PostgreSQL](https://www.postgresql.org/). Most of the application's logic happens on the front end, using Redux actions to make fetch calls to the backend, and to [Cloudinary's](https://cloudinary.com/documentation) Rest API to upload audio files.

The backend serves the frontend and simply fetches data from the postgres database.

![Soundzone application architecture](/Documentation/readme-resources/Soundzone_Application_Architecture.png)

## Frontend Overview
The most involved logic in Soundzone occurs in the frontend. The front end extensively uses the Redux store and prop threading to provide a seamless listening experience. Below are the frontend technologies used with some notes regarding their implementation.

### Frontend Technologies Used
#### React
Soundzone is a [React](https://reactjs.org/) application, allowing for a snappy user experience. React's built-in hooks are used throughout the app, and the passing of functions through props is what allows Soundzone to provide uninterrupted playback of audio. The use of threading functions through the props was the most important descision in developing this app, as it allowed me to make `Sound` components glorified visualizers while the `App` component manages audio playback. Before implementing this strategy I had a lot of difficulty making `Sound` components keep track of the currently playing sound and be able to both interrupt playback of other sounds, and persist playback through page changes.

##### Playback Persistence
![Playback Persistence](/Documentation/readme-resources/playback_persistence.gif)

#### Redux
The [Redux](https://redux.js.org/) library is used in Soundzone to manage the state of the application and make requests to both the server and Cloudinary's Rest API.

Sounds are fetched whenever the user navigates to a different view and stored in the Redux store. This makes the data for each `Sound` to be immediately available for playback.

#### Cloudinary Rest API
Soundzone takes advantage of [Cloudinary's](https://cloudinary.com/documentation)  Rest API to store audio files and images on Cloudinary's database, and in turn storing url references to those files in a postgres database. Doing this frees up space on the postgres database, and since Cloudinary is the service that Soundcloud uses, eliminates some scaling concerns as well.

##### Redux Thunks for uploading a Sound
``` js
// updateSound posts sound to Cloudinary and dispatches the url sent back to the redux store, allowing for previewing of the waveform
// this is called when a user selects a sound to upload
export const updateSound = (sound) => async (dispatch) => {
    try {
        const data = new FormData();
        data.append('file', sound);
        data.append('upload_preset', cloudinaryPreset);
        const res = await fetch(`${cloudinaryUrl}/video/upload`, {
            method: "POST",
            body: data,
        });
        if (!res.ok) throw res;
        const soundObj = await res.json()
        const url = soundObj.secure_url;
        dispatch(setSound(url));
    } catch (err) {
        console.error(err);
    }
}

// uploadSound takes the data associated with a sound and sends it to the server to be stored
// this is called when a user hits submit on the Upload component
export const uploadSound = (userId, soundUrl, waveUrl, imageUrl, description, name, token, history) => async (dispatch) => {
    try {
        const body = JSON.stringify({ userId, soundUrl, waveUrl, imageUrl, description, name })
        const res = await fetch(`${apiBaseUrl}/sounds`, {
            method: "POST",
            body,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        history.push(`/users/${userId}`);
    } catch (err) {
        const errorJson = await err.json();
        dispatch(setUploadError([errorJson.errors[0].msg]))
    }
};
```

#### React-Hook-Form
[React-Hook-Form](https://react-hook-form.com/) allows for simple and powerful form validations and error handling. The built-in functions `register`, `handleSubmit`, and the `errors` variable eliminated the need for a series of functions and hooks that would provide the same functionality.

##### React-Hook-Form on Login
``` jsx
const LoginForm = ({ login, loginError = [], clearLoginError }) => {
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        clearLoginError()
    }, [clearLoginError])

    const formSubmitter = data => {
        login(data.username, data.password)
    }

    const loginGuest = () => {
        login('Guest', 'guestPassword')
    }

    return (
        <>
            <div className={styles.formContainer}>

                <form className={styles.form} onSubmit={handleSubmit(formSubmitter)}>
                    <h1 className={styles.title}>Sign In</h1>
                    <input
                        className={styles.usernameInput}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        autoComplete="off"
                        ref={register({ required: true })}
                    />
                    {errors.username && <div className={styles.error1}>username required</div>}
                    <input
                        className={styles.passwordInput}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        ref={register({ required: true })}
                    />
                    {loginError.length !== 0
                    ?
                        <div className={styles.error}>{`${loginError[0]}`}</div>
                    :
                        ""
                    }
                    {errors.password && <div className={styles.error2}>password required</div>}
                    <LabelButton labelfor='submit-login' innerhtml='Sign In'/>
                    <input
                        className={styles.submitInput}
                        type="submit"
                        id='submit-login'
                        value="Sign In"
                    />
                    <LabelButton labelfor='submit-login-guest' innerhtml='Sign In as Guest'/>
                    <input
                        className={styles.submitInput}
                        onClick={loginGuest}
                        type="button"
                        id='submit-login-guest'
                        value="Sign In as Guest"
                    />
                </form>
            </div>
        </>
    )
}
```

#### React-Dropdown-Select
One of the challenges with developing Soundzone was the creation of a search feature where users can search for other users by username. [React-Dropdown-Select](https://sanusart.github.io/react-dropdown-select/) allowed for easy creation of filtering search dropdown, avoiding the need for making difficult styling of `<select>` and `<option>` elements.

#### CSS
Soundzone takes advantage of [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) modules in order to avoid namespacing problems.

## Backend Overview
Soundzone uses a PostgreSQL database with an Express server. The backend of Soundzone is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies that make this application possible.

### Backend Technologies Used
#### ExpressJS
[Express](https://expressjs.com/) made sense to use for Soundzone because of its great docs and the wealth of learning material online. It made routing and error handling a breeze. I also used [Express-Validator](https://express-validator.github.io/docs/), which gave me a simple way to create validation middlewares.

#### PostgreSQL
Soundzone uses a [PostgreSQL](https://www.postgresql.org/) database with [Sequelize](https://sequelize.org/) to communicate with the server. Using table relationships with postgres was crucial in querying the database, and making [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) operations easy to implement.

## Conclusion and Further Development
Soundzone is my first solo full stack application! It was a really exciting challenge to try and replicate features from Soundcloud. Doing a project like this gave me a fun sandbox environment to play around with React and Redux, which I'd only just learned a week prior at the time!

**Further Development:** I have a somewhat exhaustive list of features and some ideas for features in the futures found [Here](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/featureList.md)!






u made it to the end of the page! thanks for reading ;)
