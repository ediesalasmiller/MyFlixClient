// import React, { useState } from "react";
// import axios from "axios";
// import { Container } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";
// import { UserInfo } from "./user-info";
// import FavoriteMovies from "./favorite-movies";

// export function ProfileView({ movies, onUpdateUserInfo }) {
//   const [user, setUser] = useState({
//     usernameErr: username,
//   });
// }

// // const favoriteMovieList = movies.filter((movies) {

// // })

// return (
//   <div>
//     <UserInfo name={user.Username} email={user.Email} />
//     <FavoriteMovies favoriteMovieList={favoriteMovieList} />
//     <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
//       <h2>Make some changes</h2>
//       <label>Username: </label>
//       <input
//         type="text"
//         name="Username"
//         defaultValue={user.Username}
//         onChange={(e) => handleUpdate(e)}
//       />
//       <label>Password</label>
//       <input
//         type="password"
//         name="password"
//         defaultValue={user.Password}
//         onChange={(e) => handleUpdate(e)}
//       />
//       <label>Email address</label>
//       <input
//         type="email"
//         name="email"
//         defaultValue={user.Email}
//         onChange={(e) => handleUpdate(e.target.value)}
//       />
//       <button variant="primary" type="submit">
//         Update
//       </button>
//     </form>
//   </div>
// );
