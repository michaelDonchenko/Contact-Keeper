import React, {useContext} from 'react'
import Home from './components/pages/Home'
import About from './components/pages/About'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import AlertsState from './context/alerts/AlertsState'
import setAuthToken from './utills/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'


const App = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
    
  }

  return (
    <AuthState>
      <ContactState>
        <AlertsState>
        <Router>
          <Navbar />
              <Switch>
                <div className="container">
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </div>
              </Switch>
        </Router>
        </AlertsState>
      </ContactState>  
    </AuthState>
  );
}

export default App;
