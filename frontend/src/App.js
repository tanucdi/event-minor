import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Header/NavBar';
import {BrowserRouter,Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CreateEvent from './components/CreateEvent';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BrowseEvent from './components/BrowseEvent'; 
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/actions/authAction";
import Logout from './components/Auth/Logout';


// Check for token to keep user logged in
if (localStorage.getItem('jwtToken')) {
  // Set auth token header auth
  const token = localStorage.getItem('jwtToken')
  console.log(token)
  const config={
    headers:{
        "Content-Type":"application/json"
    }
}    
    config.headers['jwt-token']=token; 
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
function App() {
  return (
    
    <BrowserRouter>
    <Provider store={store}>
    <div className="App" >
      <NavBar />
     <Route exact path="/" component={Landing} />
     <Route exact path="/create" component={CreateEvent}/>
     <Route exact path="/login" component={Login} />
     <Route exact path='/browseevent' component={BrowseEvent} />
     <Route exact path='/register' component={Register} />
     <Route exact path='/logout' component={Logout} />
    </div>
    </Provider>
    </BrowserRouter>
    
  );
}

export default App;
