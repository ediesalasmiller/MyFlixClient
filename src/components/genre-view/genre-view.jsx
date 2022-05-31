import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <Container className="genre-view">
        <Row className="mt-3">
          <Col className="label">Genre </Col>
          <Col className="value">{genre.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">about </Col>
          <Col className="value">{genre.Description}</Col>
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
