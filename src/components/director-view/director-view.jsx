import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container className="director-view">
        <Row className="director-name">
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
