import React from 'react';
import './App.css';
import Home from './components/Home';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import PrivateRoute from './util/PrivateRoute';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Route exact path="/" component={Login} />
      <Route exact path="/Onboarding" component={Onboarding} />
      <PrivateRoute path="/Home" component={Home}/>
    </div>
  );
}

export default App;
