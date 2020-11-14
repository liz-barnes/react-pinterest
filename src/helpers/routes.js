import React from 'react';
import {
  BrowserRouter as Router,
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

export default function Routes({ authed }) {
  return (
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Home authed={authed} />} />
            <Route exact path='/pins' component={() => <Pins authed={authed} />} />
            <Route exact path='/single-board' component={() => <SingleBoard authed={authed} />} />
            <Route exact path='/pin-details' component={() => <PinDetails authed={authed} />} />
            <Route exact path='/board-form' component={() => <BoardForm authed={authed} />} />
            <Route exact path='/pin-form' component={() => <PinForm authed={authed} />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
  );
}
