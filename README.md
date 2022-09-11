# MyFlixClient
Using React, building a client-side for an application called myFlix based on its existing server-side code (REST API and database).


-view-movie had add favorite movie
-profile view has delete favorite movie
 -re authorized the bearer token and authorization in index.js in movie_api 
 https://edieflixdb.herokuapp.com/movies is now needing authorization token
 
 -used package Axios: a popular library mainly used to send asynchronous HTTP requests to REST endpoints. used for CRUD on my API
 -Data is exchanged in JSON format
 -react redux framework
 -endpoints all in Main-view.jsx
 -below became MoviesList because during redux. but with the additional filters.
           return movies.map((m) => (
         <Col md={3} key={m._id}>
        <MovieCard movie={m} />
         </Col>
        ));
