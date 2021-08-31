import React, { lazy } from 'react'

const Login = lazy(() => import("./pages/Login"));


function UnauthenticatedApp () {
  return (
    <>
        <Login />
    </>
  );
}

export default UnauthenticatedApp