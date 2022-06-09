import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Row, Col, Figure } from "react-bootstrap";

export function FavoriteMoviesView(props) {
  const { movies, favoriteMovies, currentUser, token } = props;
  const favoriteMoviesId = (favoriteMovies || []).map((m) => m._id);

  const favoriteMoviesList = movies.filter((m) => {
    return favoriteMoviesId.includes(m._id);
  });

  const handleMovieDelete = (movie) => {
    axios
      .delete(
        `https://edieflixdb.herokuapp.com/users/${currentUser}/favorites/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(`movie deleted.`);
        window.open("/users/:username", "_self");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMoviesList.map(({ ImagePath, Title, _id }) => {
          return (
            <Col xs={10} sm={8} md={6} lg={4} key={_id} className="fav-movie">
              <Figure>
                <Link to={`movies/${_id}`}>
                  <Figure.Image src={ImagePath} alt={Title} />
                  <Figure.Caption>{Title}</Figure.Caption>
                </Link>
                <Button
                  className="button ml-2"
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    handleMovieDelete(_id);
                  }}
                >
                  Remove from List
                </Button>
              </Figure>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
