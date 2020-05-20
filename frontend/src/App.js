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
import PostEditor from './pages/PostEditor';
import PostCreator from './pages/PostCreator';
import Portfolio from './pages/Portfolio';
import PortfolioEditor from './pages/PortfolioEditor';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <Nav />
          <Switch>
            <Route path="/blog/new">
              <PostCreator />
            </Route>
            <Route path="/blog/:id/edit">
              <PostEditor />
            </Route>
            <Route path="/blog/:id">
              <Post />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/cv/edit">
              <PortfolioEditor />
            </Route>
            <Route path="/cv">
              <Portfolio />
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
