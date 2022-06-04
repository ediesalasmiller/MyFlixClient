import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "./favorite-movies";

export function ProfileView(props) {
  const [setUser, user] = useState(null);
  const [movies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getUser = () => {
    axios
      .get(`https://edieflixdb.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setFavoriteMovies(response.data.favoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = (e) => {
    axios
      .delete("https://edieflixdb.herokuapp.com/users/${currentUser}", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The account ${user.Username} has been deleted.`);
        localStorage.clear();
        window.open("/register", "_self");
      })
      .catch((response) => {
        console.error(response);
        alert("unable to delete user");
      });
  };

  state = {
    show: false,
  };
  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  return (
    <Container id="profile-view">
      <Row>
        <h4>your profile information</h4>
      </Row>
      <Row>
        <Col className="label">Username </Col>
        <Col className="value">{user.Username}</Col>
      </Row>
      {/* <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
      </Row>
      <Row className="mt-5">
        <h4>Favorite Movies</h4>
      </Row>
      <Row className="mt-3">
        <FavoriteMovies
          movies={movies}
          favoriteMovies={favoriteMovies}
          currentUser={currentUser}
        />
      </Row> */}
      <div className="movie-modal">
        <Button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={(e) => {
            this.showModal(e);
          }}
        >
          {" "}
          Favorite Movies{" "}
        </Button>

        <Modal onClose={this.showModal} show={this.state.show}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
          fuga omnis a sed impedit explicabo accusantium nihil doloremque
          consequuntur.
        </Modal>
      </div>
      <Button className="d-block mt-5" variant="warning" onClick={handleDelete}>
        Delete profile?
      </Button>
      <Modal show={this.state.show} />
    </Container>
  );
}
