import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function ProfileView({ movies }) {
  const [setUsername, user] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  //useEffect
  useEffect(() => {
    getUser();
  }, []);

  //retreive user information
  const getUser = () => {
    let token = localStorage.getItem("token");
    let currentUser = localStorage.getItem("user");
    axios
      .get(`https://edieflixdb.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setFavoriteMovies(response.data.favoriteMovies);
        console.log(response.data);
      })
      .catch((error) => console.error("Error" + error));
  };

  const updateUser = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .put(
        `https://edieflixdb.herokuapp.com/users/${user}`,
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
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
      })
      .catch((e) => {
        console.log("Error updating user" + error);
      });
  };

  //delete current user
  const handleDelete = (e) => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete("https://edieflixdb.herokuapp.com/users/${user}", {
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
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter new email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="warning" onClick={updateUser}>
          Update profile
        </Button>

        <Button
          className="d-block mt-5"
          variant="warning"
          onClick={handleDelete}
        >
          Delete profile?
        </Button>
        {/* <Modal show={this.state.show} /> */}
      </Form>
      <h4>Favorite Movies</h4>
      {handleFavorite()}
    </Container>
  );
}
