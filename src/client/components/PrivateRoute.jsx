import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ path, component: Component, currentUser, ...rest }) => (
  <Route {...path} render={props => (
    currentUser ?
      <Component {...rest} history={props.history} currentUser={currentUser} /> :
      <Redirect to={{
        pathname: '/',
        state: { from: props.location },

      }} />
  )} />
);

export default PrivateRoute;
