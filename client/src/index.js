import React from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import './scss/_reset.scss';

import App from './components/main/Main.jsx';
import Room from './components/room/room.jsx';

ReactDOM.render(
  <BrowserRouter> 
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/room' component={Room} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

