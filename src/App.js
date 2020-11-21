import React from 'react';
import Header from './component/header.js';
import Product from './component/production.js';
import Admin from './pages/admin.js';
import Login from './pages/login.js'
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
          {/* <Header />
          <Product /> */}
          <Route exact path="/" component={Header} />
          <Route exact path="/products" component={Product} />
          <Route path="/Admin" component={Admin} />
          <Route path="/Login" component={Login} />

        </div>
      </Router>
    );
  }
}

export default App;
