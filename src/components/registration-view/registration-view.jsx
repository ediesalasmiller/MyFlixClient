import React, { useState } from "react";
import PropTypes from "prop-types";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    props.onRegister(username);
  };

  return (
    <form>
      <label>
        Set Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Set Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Register
      </button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
