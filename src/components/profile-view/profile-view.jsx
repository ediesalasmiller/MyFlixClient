import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { UserInfo } from "./user-info";
import { FavoriteMoviesView } from "./favorite-movies";

export function ProfileView(props) {
  const [username, setUsername] = useState(props.username);
  const [movies, setMovies] = useState(props.movies);
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
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
          FavoriteMovies: favoriteMovies,
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

  return (
    <>
      <Row>
        <h4>Your profile</h4>
      </Row>
      <Row>
        <Col sm="10" md="8" lg="6">
          <p>to make changes to profile fill out form below.</p>
          <Form>
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
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***"
                required
              />
              {/* display validation error */}
              {/* {values.passwordErr && <p>{values.passwordErr}</p>} */}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* display validation error */}
              {/* {values.emailErr && <p>{values.emailErr}</p>} */}
            </Form.Group>

            <Form.Group controlId="formEdit" className="mt-3">
              <Button variant="dark" onClick={updateUser}>
                Update profile
              </Button>
              {""}
              <Button variant="danger" onClick={handleDelete}>
                Delete profile
              </Button>
              {""}
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Col className="mt-5">
        <Row>
          <FavoriteMoviesView
            movies={movies}
            favoriteMovies={favoriteMovies}
            currentUser={currentUser}
            token={token}
          />
        </Row>
      </Col>
    </>
  );
}
