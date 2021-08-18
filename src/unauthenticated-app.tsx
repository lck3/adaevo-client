import React, { lazy } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));


function UnauthenticatedApp () {
  return (
    <>
        <Login />
    </>
  );
}

export default UnauthenticatedApp