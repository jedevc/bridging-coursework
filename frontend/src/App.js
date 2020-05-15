import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Nav from './components/Nav';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <Nav />
          <Route exact path="/blog/:id">
            <Post />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
