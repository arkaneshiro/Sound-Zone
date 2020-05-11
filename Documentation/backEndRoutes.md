# Users
  * GET /users/:id
    -  returns a users info and all related sounds, follows, following, etc
  * POST /users
    - create a new user (returns userId and token)
  * POST /users/token
    - verifies user login and returns token for the user
  * DELETE /users
    - deletes a user and all related sounds, follows, etc
  * POST /users/:id/follow
    - creates a follow for a user, returns updated object of followers for the user who was just followed
  * DELETE /users/:id/follow
    - deletes a follow for a user, returns updated object of followers for the user who was just unfollowed.

# Sounds
  * GET /users/:id/sounds
    - returns all of a particular users sounds
  * GET /users/:id/feed
    - returns all of the sounds for a users feed
  * GET /sounds/:id
    - returns a sound and all its details
  * POST /sounds
    - creates a new sound
  * DELETE /sounds/:id
    - deletes a sound and all related social content
  * POST /sounds/:id/like
    - creates a like for a sound, returns updated number of likes for a sound
  * POST /sounds/:id/comment
    - creates a comment for a sound, returns updated 'comments' object
