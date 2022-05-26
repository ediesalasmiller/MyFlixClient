import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
    render() {
        const { movie }= this.props;
        return (
          <Card>
            <Card.Body>
              <Card.Title>{movie.Genre}</Card.Title>
              <Link to={`/genre/${Name}`}>
                <Button variant="link">Learn more</Button>
              </Link>
            </Card.Body>
          </Card>
        );
    }
}