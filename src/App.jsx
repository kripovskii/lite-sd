import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'; 
import NewTicket from './components/NewTicket';
import Tickets from './components/Tickets';
import Ticket from './components/Ticket';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} /> 
          <Route exact path="/new" component={NewTicket} />
          <Route exact path="/tickets" component={Tickets} />
          <Route path="/ticket/:number" component={Ticket} /> {/* Используем :id для динамического параметра */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
