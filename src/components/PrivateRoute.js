// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, authorizedRoles, userRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        if (!authorizedRoles.includes(userRole)) {
          return <Redirect to="/login" />; // Redirect to an unauthorized page or handle unauthorized access appropriately
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
