import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'; 
import NewTicket from './components/NewTicket';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} /> 
          <Route exact path="/new" component={NewTicket} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
