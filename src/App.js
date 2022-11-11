import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Header } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}

export default App;
