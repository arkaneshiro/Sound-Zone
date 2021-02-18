## Documentation links
- [Feature List](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/featureList.md)
- [Technologies](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/Technologies.md)
- [Challenges in Development](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/Challenges.md)
- [MVP](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/mvp.md)
- [Front End Routes](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/frontEndRoutes.md)
- [Back End Routes](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/backEndRoutes.md)
- [Schema Image](https://github.com/arkaneshiro/Sound-Zone/blob/master/Documentation/schema.png)

## Instructions to run locally
- clone repo
- run command "npm install"
- create .env file based on .env.example with your cloudinary information
- run command "npm start" to start client, follow instructions on [Sound-Zone-Backend](https://github.com/arkaneshiro/Sound-Zone-Backend) to start server



# Soundzone
[Soundzone](https://sound-zone.herokuapp.com) by [Riki Kaneshiro](https://arkaneshiro.github.io/)

**Table of Contents**
* [Soundzone at a Glance](#soundzone-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-next-steps)

## Soundzone at a Glance
Soundzone is a web application based on Soundcloud where users can upload and play sounds, and follow other users to play their sounds.

Users can click through the waveform of a sound to 'scrub' through playback of sounds.

## Application Architecture
Soundzone's stack includes [React](https://reactjs.org/),[Redux](https://redux.js.org/), [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), and [PostgreSQL](https://www.postgresql.org/). Most of the application's logic happens on the front end, using Redux actions to make fetch calls to the backend, and to [Cloudinary's](https://cloudinary.com/documentation) Rest API to upload audio files.

The backend serves the frontend and simply fetches data from the postgres database.

## Frontend Overview
The most involved logic in Soundzone occurs in the frontend. The front end extensively uses the Redux store and prop threading to provide a seamless listening experience. Below are the frontend technologies used with some notes regarding their implementation.

### Frontend Technologies Used
#### React
Soundzone is a [React](https://reactjs.org/) application, and reaps all the benefits as such, allowing for a snappy user experience. React's built-in hooks are used throughout the app, and the passing of functions through props is what allows Soundzone to provide uninterrupted playback of audio. The use of threading functions through the props was the most important descision in developing this app, as it allowed me to make 'Sound' components glorified visualizers while the 'App' component manages audio playback. Before implementing this strategy I had a lot of difficulty making 'Sound' components keep track of the currently playing sound and be able to both interrupt playback of other sounds, and persist playback through page changes.

#### Redux
The [Redux](https://redux.js.org/) library is used in Soundzone to manage the state of the application and make requests to both the server and Cloudinary's Rest API.

Sounds are fetched whenever the user navigates to a different view and stored in the Redux store. This makes the data for each 'Sound' to be immediately available for playback.

The 'Upload' component also takes advantage of the 'useState' hook to preview the waveform of a sound to be saved in the database. It does this by using a fetch call to upload to Cloudinary, which in turn sends back urls which are the audio file itself and the waveform of the audio. It is only then that the user can send the sound's urls to the postgres database.

#### Cloudinary Rest API
Soundzone takes advantage of [Cloudinary's](https://cloudinary.com/documentation)  Rest API to store audio files and images on Cloudinary's database, and in turn storing url references to those files in a postgres database. Doing this frees up space on the postgres database, and since Cloudinary is the service that Soundcloud uses, eliminates some scaling concerns as well.

#### React-Hook-Form
[React-Hook-Form](https://react-hook-form.com/) allows for simple and powerful form validations and error handling. The built-in functions 'register', 'handleSubmit', and the 'errors' variable eliminated the need for a series of functions and hooks that would provide the same functionality.

#### React-Dropdown-Select
One of the challenges with developing Soundzone was the creation of a search feature where users can search for other users by username. [React-Dropdown-Select](https://sanusart.github.io/react-dropdown-select/) allowed for easy creation of filtering search dropdown, avoiding the need for making difficult styling of 'select' and 'option' elements.

#### CSS
Soundzone takes advantage of CSS modules in order to avoid namespacing problems.

## Backend Overview
Soundzone uses a PostgreSQL database with an Express server. The backend of Soundzone is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies that make this application possible.

### Backend Technologies Used
#### ExpressJS
[Express](https://expressjs.com/) made sense to use for Soundzone because of its great docs and the wealth of learning material online. It made routing and error handling a breeze. I also used Express-validator, which gave me a simple way to create validation middlewares.

#### PostgreSQL
Soundzone uses a [PostgreSQL](https://www.postgresql.org/) database with [Sequelize](https://sequelize.org/) to communicate with the server. Using table relationships with postgres was crucial in querying the database, and making [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) operations easy to implement.

## Conclusion and Next Steps
