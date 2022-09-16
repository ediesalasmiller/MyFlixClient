# MyFlixClient
Using React, building a client-side for an application called myFlix based on its existing server-side code (REST API and database).

## User Stories
*  As a user, I want to be able to access information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.
This web application, created with React.js and Sass, provides users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies. it`s based on its [existing server-side code](https://github.com/ediesalasmiller/movie_api) (REST API and database).

## Key Features
* Filter events by city.
* Show/hide event details.
* Specify number of events.
* Use the app when offline.
* Add an app shortcut to the home screen.
* View a chart showing the number of upcoming events by city.
 
 ## Page purpose
 Main view
* Returns a list of ALL movies to the user (each listed item with an image, title, and description)
* Sorting and filtering
* Ability to select a movie for more details
Single movie view
* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites
Login view
* Allows users to log in with a username and password
* Registration view
* Allows new users to register (username, password, email, birthday)
Genre view
* Returns data about a genre, with a name and description
* Displays example movies
Director view
* Returns data about a director (name, bio, birth year, death year)
* Displays example movies
Profile view
* Allows users to update their user info (username, password, email, date of birth)
* Allows existing users to deregister
* Displays favorite movies
* Allows users to remove a movie from their list of favorites
 
 ## Libraries / Frameworks used
 * Axios: a popular library mainly used to send asynchronous HTTP requests to REST endpoints. used for CRUD on my API
 * Data is exchanged in JSON format
 * React Redux
 * endpoints all in Main-view.jsx


  https://edieflixdb.herokuapp.com/
