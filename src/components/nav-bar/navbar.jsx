import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  Container,
} from "react-bootstrap";

//export function for main-view user
export function NavigationBar({ user }) {
  //clearing the local storage and going to login page onLoggedOut
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  //return a token from local storage, else returns false... why?
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  //unordered list
  return (
    <Navbar
      style={{ marginBottom: "40" }}
      sticky="top"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/">My Flix Movie Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll"></Navbar.Collapse>
        <NavDropdown title="Profile" id="basic-nav-dropdown">
          {isAuth() && (
            <NavDropdown.Item href={`/users/${user}`}>Profile</NavDropdown.Item>
          )}
          {isAuth() && <NavDropdown.Item href="/">Sign in</NavDropdown.Item>}
          {isAuth() && (
            <NavDropdown.Item href="/register">Sign up</NavDropdown.Item>
          )}

          <Button
            variant="link"
            onClick={() => {
              onLoggedOut();
            }}
          >
            Logout
          </Button>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
