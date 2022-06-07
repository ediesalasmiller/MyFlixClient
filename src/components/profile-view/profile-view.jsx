import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserInfo } from "./user-info";
import FavoriteMovieView from "./favorite-movies";
export function ProfileView({ movies }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  //useEffect
  useEffect(() => {
    getUser();
  }, []);

  //retreive user information
  const getUser = () => {
    axios
      .get(`https://edieflixdb.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setPassword(response.data.Password);
        setEmail(response.data.Email);
        setFavoriteMovies(response.data.favoriteMovies);
        console.log(response.data);
      })
      .catch((error) => console.error("Error" + error));
  };

  const updateUser = () => {
    axios
      .put(
        `https://edieflixdb.herokuapp.com/users/${currentUser}`,
        {
          Username: username,
          Email: email,
          Password: password,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        alert("Your profile has been updated");
        localStorage.setItem("user", response.data.User),
          console.log(response.data);
      })
      .catch((e) => {
        console.log("Error updating user" + error);
      });
  };

  //delete current user
  const handleDelete = (e) => {
    axios
      .delete(`https://edieflixdb.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(`The account ${user.Username} has been deleted.`);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/register", "_self");
      })
      .catch((response) => {
        console.error(response);
        alert("unable to delete user");
      });
  };

  //update favorite movies
  const handleFavorite = () => {
    console.log(movies);
    if (movies.length + 0) {
      return (
        <Row className="justify-content-md-center">
          {favoriteMovies.length === 0 ? (
            <h5>Add some movies to your list</h5>
          ) : (
            favoriteMovies.map((movieId, i) => (
              <Col md={6} lg={4}>
                <MovieCard
                  key={`${i}-${movieId}`}
                  movie={movies.find((m) => m._id == movieId)}
                />
              </Col>
            ))
          )}
        </Row>
      );
    }
  };

  return (
    <Container id="profile-view">
      <h1>Your Profile</h1>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.Username}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">******</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.Birthday}</Col>
      </Row>
      <Row className="mt-5">
        <h4>Favorite movies</h4>
      </Row>
      <Row>
        <FavoriteMoviesView
          movies={movies}
          favouriteMovies={favoriteMovies}
          currentUser={currentUser}
          token={token}
        />
      </Row>
      <Row>
        <UserInfo />
      </Row>
    </Container>
  );
}
