import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from '../views/home';
import Pins from '../views/pins';
import SingleBoard from '../views/singleBoard';
import PinDetails from '../views/pinDetails';
import BoardForm from '../views/boardForm';
import PinForm from '../views/pinForm';
import NotFound from '../views/NotFound';
import Boards from '../views/boards';

export default function Routes({ authed }) {
  return (
          <Switch>
            <Route exact path='/' component={() => <Home authed={authed} />} />
            <Route exact path='/pins' component={() => <Pins authed={authed} />} />
            <Route exact path='/pin-details' component={() => <PinDetails authed={authed} />} />
            <Route exact path='/board-form' component={() => <BoardForm authed={authed} />} />
            <Route exact path='/pin-form' component={() => <PinForm authed={authed} />} />
            <Route exact path='/boards' component={() => <Boards authed={authed} />} />
            <Route exact path='/boards/:id' component={(props) => <SingleBoard authed={authed} {...props} />} />
            <Route component={NotFound} />
          </Switch>
  );
}
