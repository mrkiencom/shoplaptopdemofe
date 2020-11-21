import React from 'react';
import Header from './component/header.js';
import Product from './component/production.js';
import Admin from './pages/admin.js';
<<<<<<< HEAD
import Login from './pages/login.js'
=======
import "./App.css"

>>>>>>> 86bc996bce1e4ad5847ace8d225224295350cdda
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";



class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
<<<<<<< HEAD
          {/* <Header />
          <Product /> */}
          <Route exact path="/" Component={Header} />
          <Route path="/Admin" component={Admin} />
          <Route path="/Login" component={Login} />
=======
          <Header />
          <Product />

          <Route path="/Admin" > <Admin /></Route>

>>>>>>> 86bc996bce1e4ad5847ace8d225224295350cdda

        </div>
      </Router>
    );
  }
}

export default App;
