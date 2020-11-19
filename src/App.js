import React from 'react';
import Header from './component/header.js';
import Product from './component/production.js';
import Admin from './pages/admin.js';
import "./App.css"

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
          <Header />
          <Product />

          <Route path="/Admin" > <Admin /></Route>


        </div>
      </Router>
    );
  }
}

export default App;
