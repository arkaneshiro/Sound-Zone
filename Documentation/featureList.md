# Soundzone Feature List
1. Users
    * User registration with validations
    * Login page for users with validations
    * User authentication that persists throughout session
    * Guest Users (for demonstration)
    * Login/logout functionality
    * Profiles/Profile photo that appears in top right when logged in
2. Sounds
    * sounds sent to cloudinary, stored, then displayed to user
    * typical play / pause
    * user-selectable playback start
    * comments & likes
    * play counter
    * artwork

3. UI Design
    * Landing Page
      * User login/registration
    * Dashboard
      * nav bar
        * links to dashboard, profile, and logout
      * sound bar (always peristent playing current song)
        * play/pause/restart
        * shows song time elapsed (scrollable)
      * feed of sounds
        * shows sounds of yourself and people you follow
    * Sound
      * shows artwork as background and to the side
      * big playback button & scrolling
      * shows sound details (description, likes, play count, genre)
      * comments section
      * only page without sound bar
      * delete button appears on your sounds
    * Profile
      * shows users sounds
      * upload sound link
      * shows people user follow
      * shows people who follow user
      * delete button for sounds appears on your profile
    * Upload sound
      * uploads to cloudinary
      * detail form (description, image, genre)
      * when successful, sends you to profile

4. Stretch goals
   * song playback memory (goes away when you navigate away?)
   * set 'playing next'
   * Auth0 login
   * Comments w/ timestamp
   * search ( by name / genre! )
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
