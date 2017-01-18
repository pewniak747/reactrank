import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, browserHistory } from 'react-router';

import routes from './routes';
import RankingPage from './RankingPage';
import UserPage from './UserPage';
import RepoPage from './RepoPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Router history={browserHistory}>
          <Route path={routes.ranking} component={RankingPage} />
          <Route path={routes.user(':id')} component={UserPage} />
          <Route path={routes.repo(':id')} component={RepoPage} />
        </Router>
      </div>
    );
  }
}

export default App;
