import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import routes from './routes';
import RankingPage from './RankingPage';
import UserPage from './UserPage';
import RepoPage from './RepoPage';

import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.root}>
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
