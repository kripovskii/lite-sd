import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'; 
import NewTicket from './components/NewTicket';
import Tickets from './components/Tickets';
import Ticket from './components/Ticket';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const handleLogin = (token, history) => {
    localStorage.setItem('token', token);
    history.push('/home');
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login onLogin={handleLogin} />
          </Route>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/new" component={NewTicket} />
          <PrivateRoute exact path="/tickets" component={Tickets} />
          <PrivateRoute path="/ticket/:number" component={Ticket} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
