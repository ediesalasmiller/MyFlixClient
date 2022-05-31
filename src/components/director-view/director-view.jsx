import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <Container className="director-view">
        <Row className="mt-3">
          <Col className="label">Director: </Col>
          <Col className="value">{director.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">about </Col>
          <Col className="value">{director.Bio}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">birthday </Col>
          <Col className="value">{director.Birth}</Col>
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
