import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ContactState from './context/contact/contactState';


function App() {
  return (
    <ContactState>
    <>
      <Navbar/>
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/about" component={AboutPage}/>
        </Switch>
      </div>
    </>
    </ContactState>
  );
}

export default App;
