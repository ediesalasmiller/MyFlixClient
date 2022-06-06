import React from "React";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
export class FavoriteMovies extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container className="favorite-view">
        <Row className="mt-3">
          <Col className="label">Favorite Movies </Col>
          <Col className="value">{movie.Title}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Director </Col>
          <Col className="value">{movie.Director.Name}</Col>
        </Row>

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
