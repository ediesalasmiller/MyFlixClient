import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, ModalFooter } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import "./profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

// would like to put this in the modal import ProfileUpdate from "../profile-update/profile-update";

export function ProfileView(props) {
  const [username, setUsername] = useState(props.username);
  const [movies, setMovies] = useState(props.movies);
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
        setFavoriteMovies(response.data.FavoriteMovies);
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
        window.open("/", "_self");
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
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.open("/register", "_self");
      })
      .catch((response) => {
        console.error(response);
        alert("unable to delete user");
      });
  };
  //delete Movie from favorites button
  const handleMovieDelete = (movie) => {
    const currentUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://edieflixdb.herokuapp.com/users/${currentUser}/favorites/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert(`movie deleted.`);
        window.open("/users/:username", "_self");
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  //render favorite movies
  //update favorite movies
  const handleFavorite = (movie) => {
    if (movies.length + 0) {
      return (
        <Row className="justify-content-md-center">
          {favoriteMovies.length === 0 ? (
            <p>
              {" "}
              <h3>
                <Link to={"/movies"}>Add some movies to your list!</Link>
              </h3>
            </p>
          ) : (
            favoriteMovies.map((movieId, i) => (
              <Col md={6} lg={4}>
                <MovieCard
                  key={`${i}-${movieId}`}
                  movie={movies.find((m) => m._id == movieId)}
                />
                <Button
                  className="button ml-2"
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    this.handleMovieDelete(movie);
                  }}
                >
                  Remove from List
                </Button>
              </Col>
            ))
          )}
        </Row>
      );
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container id="profile-view">
      <header>
        <h1>Your Profile</h1>
      </header>

      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{username}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{email}</Col>
      </Row>

      <>
        <Button variant="primary" class="changes" onClick={handleShow}>
          Make some changes
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update your profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="update-info">
              <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {/* display validation error */}
                {/* {values.usernameErr && <p>{values.usernameErr}</p>} */}
              </Form.Group>{" "}
              <Form.Group controlId="formGridPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {/* display validation error */}
                {/* {values.passwordErr && <p>{values.passwordErr}</p>} */}
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  placeholder="johndoe@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* display validation error */}
                {/* {values.emailErr && <p>{values.emailErr}</p>} */}
              </Form.Group>
              <Form.Group controlId="formEdit" className="mt-3">
                <Button variant="dark" onClick={updateUser}>
                  Save changes
                </Button>
                {""}
                <Button variant="danger" onClick={handleDelete}>
                  Delete profile
                </Button>
                {""}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Col className="mt-5">
        <p></p>
        <h4>{username}'s favorite movies</h4>

        {/* Calling function to render users favorite movies on the profile page */}
        {handleFavorite()}
      </Col>
    </Container>
  );
}
