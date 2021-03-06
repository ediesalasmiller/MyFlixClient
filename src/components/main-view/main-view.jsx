import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/view-movie";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../nav-bar/navbar";
import { GenreView } from "../genre-view/genre-view";
import MoviesList from "../movies-list/movies-list";

//MainView state
class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://edieflixdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    //thanks to mapStateToProps we can access the movies as props.
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <NavigationBar user={this.state.user} />
        <Row className="main-view justify-content-md-center">
          {/* ROUTE TO MAIN VIEW MOVIES MAP */}
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />
          {/* ROUTE TO REGISTRATION VIEW*/}
          <Route
            exact
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/* Route to movie Cards */}
          <Route
            exact
            path="/movies"
            render={() => {
              return <MoviesList movies={movies} />;
            }}
          />

          {/* ROUTE TO FINDING MOVIE VIEW  */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          {/* Route to directors   */}
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />

          {/* Route to genre   */}
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />

          {/* Route to profile view */}
          <Route
            path={`/users/:username`}
            render={({ history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
//gets the state from the store and passes it as props. instead of the component accessing the state directly, it accesses the props of that component.
let mapStateToProps = (state) => {
  // movies is the prop, and we are passing whatever is in state.movies, we will find in movies.
  return { movies: state.movies };
};

//passing above component but also setMovies action creator we made in .../actions/actions for the getMovies function... connecting everything to the store! mainview is wrapped in Provider at our entry point (index.jsx).
export default connect(mapStateToProps, { setMovies })(MainView);
