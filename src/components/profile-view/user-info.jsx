import React from "react";

export function UserInfo({ email, name }) {
  return (
    <>
      <p>User: {name}</p>
      <p>Email: {email}</p>
    </>
  );
}
