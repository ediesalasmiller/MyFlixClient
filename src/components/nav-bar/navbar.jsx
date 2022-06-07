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
        <Navbar.Brand href="/">My Flix</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll"></Navbar.Collapse>
        <Nav className="me-auto">
          {isAuth() && <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>}
          {isAuth() && <Nav.Link href="/">Sign in</Nav.Link>}
          {isAuth() && <Nav.Link href="/register">Sign up</Nav.Link>}

          <Button
            variant="link"
            onClick={() => {
              onLoggedOut();
            }}
          >
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
