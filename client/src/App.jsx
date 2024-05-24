
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Auth App</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Switch>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/">
              <h2 className="text-center mt-5">Welcome to the Auth App</h2>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
