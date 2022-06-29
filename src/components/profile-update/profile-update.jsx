import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  const { username, password, email } = state;
  return { username, password, email };
};
function ProfileUpdate(props) {
  return (
    <Form className="update-info">
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* display validation error */}
        {/* {values.usernameErr && <p>{values.usernameErr}</p>} */}
      </Form.Group>{" "}
      <Form.Group controlId="formGridPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="***"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* display validation error */}
        {/* {values.passwordErr && <p>{values.passwordErr}</p>} */}
      </Form.Group>
      <Form.Group controlId="formGridEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* display validation error */}
        {/* {values.emailErr && <p>{values.emailErr}</p>} */}
      </Form.Group>
      <Form.Group controlId="formEdit" className="mt-3">
        <Button variant="dark" onClick={updateUser}>
          Update profile
        </Button>
        {""}
        <Button variant="danger" onClick={handleDelete}>
          Delete profile
        </Button>
        {""}
      </Form.Group>
    </Form>
  );
}
export default connect(mapStateToProps)(ProfileUpdate);
