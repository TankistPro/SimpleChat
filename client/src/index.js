import React from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, BrowserRouter } from 'react-router-dom'
// import { createBrowserHistory } from 'history'

import './scss/_reset.scss';

import App from './components/main/Main.jsx';
import Room from './components/room/room.jsx';


// const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter> 
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/room' component={Room} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

