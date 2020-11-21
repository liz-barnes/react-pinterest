import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../views/home';
import Pins from '../views/pins';
import SingleBoard from '../views/singleBoard';
import PinDetails from '../views/pinDetails';
import PinForm from '../views/pinForm';
import NotFound from '../views/NotFound';
import Boards from '../views/boards';
import SearchResults from '../views/SearchResults';

export default function Routes({ user }) {
  return (
          <Switch>
            <Route exact path='/' component={() => <Home user={user} />} />
            <PrivateRoute
              exact
              path='/pins'
              component={Pins}
              user={user}
            />
            <PrivateRoute
              exact
              path='/pins/:id'
              component={PinDetails}
              user={user}
            />
            <PrivateRoute
              exact
              path='/pin-form'
              component={PinForm}
              user={user}
            />
            <PrivateRoute
              exact
              path='/pin-form'
              component={PinForm}
              user={user}
            />
            <PrivateRoute
              exact
              path='/boards'
              component={Boards}
              user={user}
            />
            <PrivateRoute
              exact
              path='/boards/:id'
              component={SingleBoard}
              user={user}
            />
            <PrivateRoute
              exact
              path='/search/:term/:type'
              component={SearchResults}
              user={user}
            />
            <Route component={NotFound} />
          </Switch>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const RouteChecker = (props) => (user
    ? (<Component {...props} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.locations } }} />));

  return <Route {...rest} render={(props) => RouteChecker(props)} />;
};
