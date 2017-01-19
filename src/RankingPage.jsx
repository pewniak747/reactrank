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

import logo from './angular.svg';
import styles from './RankingPage.css';

export const RankingUser = ({ id }) => {
  const user = getUserById(id);

  return (
    <div className={styles.user}>
      <img src={user.avatarUrl} className={styles.userAvatar} alt={user.login} />
      <Link to={routes.user(id)} className={styles.userLogin}>
        {user.login}
      </Link>
      <div>C</div>
      <div>{user.totalContributions}</div>
      <div>F</div>
      <div>{user.totalFollowers}</div>
      <div>R</div>
      <div>{user.totalPublicRepos}</div>
      <div>G</div>
      <div>{user.totalPublicGists}</div>
    </div>
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
          {orderings.map(ordering =>
            <button
              type="button"
              key={ordering}
              id={`ordering-${ordering}`}
              className={styles.ordering}
              onClick={() => this.changeOrdering(ordering)}
              data-active={ordering === currentOrdering}
            >
              {buttonLabels[ordering]}
            </button>
          )}
        </div>
        {userIds.map((id) => <RankingUser key={id} id={id} />)}
        <button
          type="button"
          id="load-more"
          onClick={this.loadMore}
        >
          load more
        </button>
      </div>
    );
  }
}

export default RankingPage;
