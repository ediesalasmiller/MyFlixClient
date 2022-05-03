import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/view-movie";
//MainView state
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      //movies state
      movies: [
        {
          _id: 1,
          Title: "Inception",
          Description: "A dream in a dream in a dream.",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        },
        {
          _id: 2,
          Title: "The Shawshank Redemption",
          Description: "Two guys in jail... bummer, they get out, woo",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg",
        },
        {
          _id: 3,
          Title: "Gladiator",
          Description: "Never seen it tbh",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
