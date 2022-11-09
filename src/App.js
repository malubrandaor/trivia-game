import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Header } />
        <Route path="/home" component={ Home } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}

export default App;
