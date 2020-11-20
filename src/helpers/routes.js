import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from '../views/home';
import Pins from '../views/pins';
import SingleBoard from '../views/singleBoard';
import PinDetails from '../views/pinDetails';
// import BoardForm from '../views/boardForm';
import PinForm from '../views/pinForm';
import NotFound from '../views/NotFound';
import Boards from '../views/boards';
import SearchResults from '../views/SearchResults';

export default function Routes({ user }) {
  return (
          <Switch>
            <Route exact path='/' component={() => <Home user={user} />} />
            <Route exact path='/pins' component={() => <Pins user={user} />} />
            <Route exact path='/pins/:id' component={() => <PinDetails user={user} />} />
            <Route exact path='/pin-form' component={() => <PinForm user={user} />} />
            {/* <Route exact path='/board-form' component={() => <BoardForm user={user} />} /> */}
            <Route exact path='/pin-form' component={() => <PinForm user={user} />} />
            <Route exact path='/boards' component={() => <Boards user={user} />} />
            <Route exact path='/boards/:id' component={(props) => <SingleBoard user={user} {...props} />} />
            <Route exact path='/search/:term/:type' component={(props) => <SearchResults {...props} />} />
            <Route component={NotFound} />
          </Switch>
  );
}
