# Soundzone Feature List
1. Users
    * User registration & login with validations
      - registration and login of users uses react-hook-form and express-validator for validations, and stores users in postgres database using the ORM Sequelize. Profile images themselves are stored on Cloudinary, and references to those files are stored as url strings in the postgres database
    * User authentication that persists throughout session
      - user authentication works by storing a jsonwebtoken in redux state. the session can persist because the token is also stored in localstorage and the app checks localstorage for a token to put back into the redux state when it starts
    * Guest User (for demonstration)
      - the login form has a button which calls the login action with the username and password for a guest user.

2. Sounds
    * sounds sent to cloudinary, stored, then displayed to user
      - sound are uploaded using the cloudinary API which returns a reference to the file in their database as a url, which is stored in a postgres database. a modified version of this url which references the waveform of the file is also stored in the database.
    * typical play / pause
      - playback of sounds is managed on the front-end's App component, which uses a number of useState hooks and helper functions to decide which sound to make the soundbar component play.
    * user-selectable playback start
      - you can change the playback of the sound currently playing by clicking around on the soundbar component

3. UI Design
    * Landing Page
      * User login/registration
    * Dashboard
      * nav bar
        * links to dashboard, profile, and logout
      * sound bar (always peristent playing current song)
        * play/pause
        * shows song time elapsed (scrollable)
      * feed of sounds
        * shows sounds of yourself and people you follow
    * Sound
      * shows artwork
      * big playback button
      * shows sound details (description, likes, play count, genre) (todo)
      * comments section (todo)
      * delete button appears on your sounds
    * Profile
      * shows users sounds
      * shows people user follow (todo)
      * shows people who follow user (todo)
      * delete account button on your profile (todo)
    * Upload sound
      * uploads to cloudinary
      * detail form (description, image, genre)
      * when successful, sends you to profile

4. future features
   * song playback memory
   * set 'playing next'
   * Comments w/ timestamp
   * search ( by name / genre )
   * delete comments (your own or on your song)
   * Delete / Deactivate account
   * Messaging
   * Mix Songs w/ cueing & filter fx

5. Technologies Used
   * HTML5
   * CSS3
   * JavaScript
   * Node.js
   * Express.js
   * React
   * Redux
   * Sequelize
   * express-validator
   * react-hook-form
