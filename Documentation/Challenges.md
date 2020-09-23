# Challenges in Developing Soundzone

## Managing Sound playback
- ### Challenge
    - Managing sound playback in such a way that the app
        - doesnt stop playback when changing views
        - doesnt play more than one sound at once
- ### Process
    - At first, I tried to make each sound component contain an audio element that would play back sound. This presented several problems
        - there would be an interruption of playback when changing views as react would render different sound components on different pages
        - it was very difficult to make one sound stop the playback of another sound
        - you would not be able to play a sound that wasn't being displayed on that page
    - After realizing these problems, I realized the best way to manage the sound components would be to make them merely visualizers and playback controllers for the soundbar, which would contain the actual audio element being played back. To realize this I used a few strategies.
        - use several useState hooks in the App component to store the playback data for the currently playing sound
        - create functions to manage the playback of audio in the App component and pass them to each Sound component as props along with their individual visusalization data

## Search Dropdown
- ### Challenge
    - Implementing a search bar which would filter results and whose dropdown items would be links to the profile pages of other users
- ### Process
    - initially, I tried to implement this using select and option elements, but this proved to be difficult for a few reasons
        - styling select and option elements in the way I wanted to was not possible, so I would have to recreate their behaviour with other elements or use a library
    - I searched for libraries to use, and I decided to use react-dropdown-select, which was flexible enough for me to be able to get the exact behaviour i was looking for and also maintain continuity style-wise

## Data Validation
- ### Challenge
    - form validation and validation for backend
- ### Process
    - I learned to use the library react-hook-form for this project, which felt really clean compared to other libraries because it reads like react hooks.
    - for the backend I used express-validator, which made it a breeze to write validation middlewares for all the appropriate routes due to its built in validations and simple custom validator syntax
