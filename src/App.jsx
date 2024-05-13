import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
{/*import Home from './pages/Home'; // Импорт компонента Main*/}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/*<Route exact path="/home" component={Home} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
