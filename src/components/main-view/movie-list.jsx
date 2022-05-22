<Route
  exact
  path="/movies"
  render={() => {
    return movies.map((m) => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ));
  }}
/>;
