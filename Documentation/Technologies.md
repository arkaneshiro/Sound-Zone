# Soundzone Front-End Technologies
1. React
    - React allows Soundzone to behave like a single-page application for a snappy user experience
    - Reacts built-in hooks are used throughout the app, especially useState, which is used by the 'App' component to control all of the 'Sound' components throughout the site
2. Redux
    - Redux is used extensively on Soundzone to store data recieved from the backend, and takes advantage of changes in this data to avoid unnessecary page rerenders
3. react-hook-form
    - allows for simple and powerful form validations and error handling, the built-in functions eliminated the need for a series of functions and hooks that would provide the same functionality
4. react-dropdown-select
    - allowed for easy creation of search dropdown, avoiding the need for making difficult styling of 'select' and 'option' elements

# Soundzone Back-End Technologies
1. Express
    - Express made sense to use for Soundzone because of its great docs and the wealth of learning material online. It made routing and error handling very easy to implement
2. express-validator
    - express-validator gave me a simple way to create validation middlewares for validations i could not implement on the front end
3. jsonwebtoken, express-bearer-token & bcrypt
    - jsonwebtoken, express-bearer-token, and bcrypt are the technologies used to authenticate users.
        - jsonwebtoken allowed me to easily make tokens that could be sent from server to client as json messages
        - express-bearer-token parses the requests to get the token
        - bcrypt allowed me to store users passwords securely using its hashing function
4. sequelize
    -  sequelize allowed me to write functions to create the database models, migrations, and seed data instead of having to write code to generate SQL commands when I wanted to update the database.
5. Cloudinary
    - cloudinary's rest API allowed me to store images and audio on their database for free and store references to the files as a url string in my postgres database.
