import React, { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //useState hook.. array instead of all seperate like Login View.. why???
  const [values, setValues] = useState({
    usernameErr: "",
    password: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username is required" });
      isReq = false;
    } else if (username.length < 4) {
      setValues({
        ...values,
        usernameErr: "Username must be 4 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password is required" });
      isReq = false;
    } else if (password.length < 4) {
      setValues({
        ...values,
        passwordErr: "Password must be 4 characters long",
      });
      isReq = false;
    }
    //   if (!email) {
    //     setValues({ ...values, emailErr: "Email is required" });
    //     isReq = false;
    //   } else if (email.indexOf("@") === -1) {
    //     setValues({ ...values, emailErr: "Email not valid" });
    //     isReq = false;
    //   }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://edieflixdb.herokuapp.com/users", {
          Username: username,
          Password: password,
          // Email: email,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Successfully Registered. Log in now.");
          window.open("/", "_self"); // argument _self will have the page open in current tab.
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register user");
        });
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {values.usernameErr && <p>{values.usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {values.passwordErr && <p>{values.passwordErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="email"
          placeholder="youremail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {values.emailErr && <p>{values.emailErr}</p>}
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <p></p>
      <p>
        Already registered <Link to={"/"}>sign in</Link> here
      </p>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};
