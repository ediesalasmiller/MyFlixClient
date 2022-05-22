import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//BrowserRouter implements states based routing, if you want hash-based, replace with HashRouter
import { BrowserRouter as Router, Route } from "react-router-dom";

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
      selectedMovie: null,
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
    axios
      .get("https://edieflixdb.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
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

  getMovies(token) {
    axios
      .get("https://edieflixdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;
    // when i remove this my code breaks
    // if (!user)
    //   return (
    //     <Row>
    //       <Col>
    //         <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />{" "}
    //       </Col>
    //     </Row>
    //   );
    // if (movies.length === 0) return <div className="main-view" />;

    <Router>
      <Row className="main-view justify-content-md-center">
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
            return movies.map((m) => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
          }}
        />
        <Route
          path="/register"
          render={() => {
            return (
              <Col>
                <RegistrationView />
              </Col>
            );
          }}
        />
        <Route
          //to display single movie view- we have fixed fragment above, to prevent too many matching URLs
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
      </Row>
    </Router>;
  }
}
// return (
//   <div className="main-view">
//     <button
//       onClick={() => {
//         this.onLoggedOut();
//       }}
//     >
//       Logout
//     </button>
//     {selectedMovie ? (
//       <Row className="justify-content-md-center">
//         <Col md={8}>
//           <MovieView
//             movie={selectedMovie}
//             onBackClick={(newSelectedMovie) => {
//               this.setSelectedMovie(newSelectedMovie);
//             }}
//           />
//         </Col>
//       </Row>
//     ) : (
//       <Row className="justify-content-md-center">
//         {movies.map((movie) => (
//           <Col md={4}>
//             <MovieCard
//               key={movie._id}
//               movie={movie}
//               onMovieClick={(newSelectedMovie) => {
//                 this.setSelectedMovie(newSelectedMovie);
//               }}
//             />
//           </Col>
//         ))}
//       </Row>
//     )}
//   </div>
// );
