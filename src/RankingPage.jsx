import React, { Component } from 'react';
import { Link } from 'react-router';

import {
  CONTRIBUTIONS,
  FOLLOWERS,
  PUBLIC_REPOS,
  PUBLIC_GISTS,
  getUserIdsRankedBy,
  getUserById,
} from './store';
import routes from './routes';

import Octicon from './Octicon';
import logo from './angular.svg';
import styles from './RankingPage.css';

export const RankingUser = ({ id, rank }) => {
  const user = getUserById(id);

  return (
    <Link to={routes.user(id)} className={styles.user}>
      <div className={styles.rank}>{rank}</div>
      <img src={user.avatarUrl} className={styles.userAvatar} alt={user.login} />
      <div className={styles.userLogin}>
        {user.login}
      </div>
      <div className={styles.stat}>
        {user.totalContributions}
        <Octicon className={styles.statIcon} name="git-commit" />
      </div>
      <div className={styles.stat}>
        {user.totalFollowers}
        <Octicon className={styles.statIcon} name="person" />
      </div>
      <div className={styles.stat}>
        {user.totalPublicRepos}
        <Octicon className={styles.statIcon} name="repo" />
      </div>
      <div className={styles.stat}>
        {user.totalPublicGists}
        <Octicon className={styles.statIcon} name="gist" />
      </div>
    </Link>
  );
}

const RANKING_COUNT_STEP = 10;

class RankingPage extends Component {
  state = {
    currentOrdering: CONTRIBUTIONS,
    rankingCount: RANKING_COUNT_STEP,
  }

  changeOrdering = (currentOrdering) => {
    this.setState({ currentOrdering, rankingCount: RANKING_COUNT_STEP });
  }

  loadMore = () => {
    const { rankingCount } = this.state;
    this.setState({ rankingCount: rankingCount + RANKING_COUNT_STEP });
  }

  render() {
    const { currentOrdering, rankingCount } = this.state;

    const userIds = getUserIdsRankedBy(currentOrdering, rankingCount);
    const orderings = [CONTRIBUTIONS, FOLLOWERS, PUBLIC_REPOS, PUBLIC_GISTS];
    const buttonLabels = {
      [CONTRIBUTIONS]: 'Contributions',
      [FOLLOWERS]: 'Followers',
      [PUBLIC_REPOS]: 'Repositories',
      [PUBLIC_GISTS]: 'Gists',
    };

    return (
      <div className={styles.root}>
        <img src={logo} alt="Angularank" className={styles.logo} />
        <div className={styles.orderings}>
          <For each="ordering" of={orderings}>
            <div
              key={ordering}
              id={`ordering-${ordering}`}
              className={styles.ordering}
              onClick={() => this.changeOrdering(ordering)}
              data-active={ordering === currentOrdering}
            >
              {buttonLabels[ordering]}
            </div>
          </For>
        </div>
        <For each="id" index="idx" of={userIds}>
          <RankingUser key={id} id={id} rank={idx+1} />
        </For>
        <div
          id="load-more"
          onClick={this.loadMore}
          className={styles.loadMore}
        >
          load more
        </div>
      </div>
    );
  }
}

export default RankingPage;
