import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';

import routes from 'routes';

import RankingPage from 'components/RankingPage';
import UserPage from 'components/UserPage';
import RepoPage from 'components/RepoPage';

import logo from './react.svg';
import styles from './style.css';

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
      <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
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
