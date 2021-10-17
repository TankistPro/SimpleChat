import React from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

import { initialState } from './reducer/reducer'

import './scss/fonts/font.css';
import './scss/style.scss';
import './scss/_reset.scss';

import App from './components/main/Main.jsx';
import Room from './components/room/room.jsx';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact render={ props => (
          initialState.currentUser ? <Room /> : <Redirect to={{
              pathname: '/',
              state: { from: props.location }
          }} />
        )
      }/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

