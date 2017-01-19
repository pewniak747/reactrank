import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import routes from './routes';
import RankingPage from './RankingPage';
import UserPage from './UserPage';
import RepoPage from './RepoPage';

import logo from './angular.svg';
import styles from './App.css';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.root}>
        <Link to={routes.ranking}>
          <img src={logo} alt="Angularank" className={styles.logo} />
        </Link>
        {children}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="" component={Layout}>
          <Route path={routes.ranking} component={RankingPage} />
          <Route path={routes.user(':id')} component={UserPage} />
          <Route path={routes.repo(':id')} component={RepoPage} />
        </Route>
      </Router>
    );
  }
}

export default App;
