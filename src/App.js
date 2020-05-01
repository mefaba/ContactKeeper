import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/AuthState';
import RegisterUnit from './components/auth/RegisterUnit';
import LoginUnit from './components/auth/LoginUnit';


function App() {
  return (
    <AuthState>
      <ContactState>
      <>
        <Navbar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/about" component={AboutPage}/>
            <Route exact path="/register" component={RegisterUnit}/>
            <Route exact path="/login" component={LoginUnit}/>
          </Switch>
        </div>
      </>
      </ContactState>
    </AuthState>
  );
}

export default App;
