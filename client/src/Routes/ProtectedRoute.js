import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { UidContext } from "../components/UserIdConnect";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const uid = useContext(UidContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (uid) {
          return <Component {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
