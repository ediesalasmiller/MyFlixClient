import React from "react";

export function UserInfo({ email, user }) {
  return (
    <>
      <p> User: {user}</p>
      <p>Email: {email}</p>
    </>
  );
}
