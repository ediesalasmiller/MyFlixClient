import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";

import PropTypes from "prop-types";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.handleMovieAdd = this.handleMovieAdd.bind(this);
  }

  //add Movie from favorites button
  handleMovieAdd = (movie) => {
    const currentUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://edieflixdb.herokuapp.com/users/${currentUser}/favorites/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert(`movie added to favorites.`);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container className="movie-view">
        <Row className="movie-poster">
          <img src={movie.ImagePath} />
        </Row>

        <Row className="movie-title">
          <Col className="value">{movie.Title}</Col>
        </Row>
        <Row className="movie-description">
          <Col className="value">{movie.Description}</Col>
        </Row>

        {/* links for the movie's director and genre view */}
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Button
          className="button ml-2"
          variant="outline-primary"
          size="sm"
          onClick={() => this.handleMovieAdd(movie)}
        >
          Add to Favorites
        </Button>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
          variant="warning"
        >
          Back
        </Button>
      </Container>
    );
  }
}
// prop types checking for data validity..  For performance reasons, propTypes is only checked in development mode.
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
};
