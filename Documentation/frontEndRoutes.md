# Splash - /
  * links to login or signup
# Login - /login (possibly a pop up?)
  * Session Form
    * --- Backend Routes Needed ---
    * POST for auth
# Sign Up - /signup (possibly a pop up?)
  * Session Form
    * --- Backend Routes Needed ---
    * POST for create user
# Dashboard - /dashboard
  * Nav bar (top)
  * Feed of Sounds
  * Sound bar (bottom)
    * --- Backend Routes Needed ---
    * GET for users and following sounds
        * should include ALL details of each sound (not comments)
    * POST for likes
    * POST for comments
# Sound - /:username/:soundname
  * Big sound player
  * sound details
  * Comments section
    * --- Backend Routes Needed ---
    * GET for song and details (and comments)
    * POST for likes
    * POST for comments
    * POST for follow
    * DELETE for unfollow
    * DELETE for remove sound (also deletes related comments, likes, and genres)
# Profile - /:username (looks different if own profile)
  * Nav bar (top)
  * feed of users sounds
  * Sound bar (bottom)
  * sidebar shows bio and followers/following
    * --- Backend Routes Needed ---
    * GET for users sounds
        * should include ALL details of each sound (not comments)
    * POST for likes
    * POST for comments
    * POST for follow
    * GET for followers / following
    * DELETE for unfollow
    * DELETE for delete account ( also deletes related sounds, follows, etc )
# Upload - /:username/upload
  * upload a sound
  * sound detail form
    * --- Backend Routes Needed ---
    * POST for new sound
    * POST for new sound's genres
