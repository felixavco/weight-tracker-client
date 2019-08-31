import React from 'react';
import './styles/App.scss';
import { setAuthToken } from './utils';
import jwt_decode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { setCurrentUser, logoutUser, clearCurrentProfile } from './redux/actions/authActions';

//React Router
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//Components
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import List from './components/users/List';
import Single from './components/users/Single';
import Profile from './components/users/Profile'
import ErrorPage from './components/errorPages/ErrorPage';
import NotFound from './components/errorPages/NotFound';

//* Checks if there is a token stored in LS
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check if token has expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div id="main" className="container">
          <Route exact path="/login" component={Login} />
          {/* Protected Routes */}
          <PrivateRoute exact path="/" component={List} />
          <PrivateRoute exact path="/List" component={List} />
          <PrivateRoute exact path="/user/:id" component={Single} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/error" component={ErrorPage} />
          {/* CatchAll route  404 page */}
          <Route exact path="/404" component={NotFound} />
          {/* <Redirect to="/404" /> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
