//this MovieList component will host my MovieCard component
import React from "react";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

import { MovieCard } from "../movie-card/movie-card";

//below, I am extravting visibilityFilter into a prop.. meaning MoviesList's props contian 2 properties: the second is movies, passed when component was expressed in the render() method of MainView component.
const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} class="background" style={{ margin: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={3} key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </>
  );
}

//first argument- mapStateToProps is a function that transforms the store into props that MovieList will use.
export default connect(mapStateToProps)(MoviesList);
