import React from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//BrowserRouter implements states based routing, if you want hash-based, replace with HashRouter
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/view-movie";

//MainView state
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      //movies state
      movies: [],
      user: null,
    };
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

  // componentDidMount() {
  //   this.getMovies();
  // }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }
  // onLoggedIn() {
  //   this.getMovies();
  // }
  onLoggedIn(authData) {
    console.log(authData);
    setUser(authData.user.Username);
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
    const { movies, user } = this.state;

    return (
      <Router>
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
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          {/* ROUTE TO REGISTRATION VIEW*/}
          <Route
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
          {/* ROUTE TO FINDING MOVIE VIEW */}
          <Route
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                  />
                </Col>
              );
            }}
          />
          {/* <Route exact path="/genres/:name" render= genre view/>
    <Route exact path="/directors/:name"" render=director view/> */}
        </Row>
      </Router>
    );
  }
}

// director view route <Route
//   path="/directors/:name"
//   render={({ match }) => {
//     if (movies.length === 0) return <div className="main-view" />;
//     return (
//       <Col md={8}>
//         <DirectorView
//           director={
//             movies.find((m) => m.Director.Name === match.params.name).Director
//           }
//         />
//       </Col>
//     );
//   }}
// />;
