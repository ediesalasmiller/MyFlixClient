import React from "React";
import { Link } from "react-router-dom";

function FavoriteMovies({ favoriteMovieList }) {
  return (
    <div>
      <h2>Favorite Movies List</h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button
              variant="secondary"
              onClick={() => removeFavorite(movies._id)}
            >
              Remove from Favorites List
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default FavoriteMovies;
