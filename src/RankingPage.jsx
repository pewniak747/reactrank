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

import styles from './RankingPage.css';

export const RankingUser = ({ id }) => {
  const user = getUserById(id);

  return (
    <dl>
      <dt>ID</dt>
      <dd>{user.id}</dd>
      <dt>Login</dt>
      <dd>
        <Link to={routes.user(id)}>
          {user.login}
        </Link>
      </dd>
      <dt>Name</dt>
      <dd>{user.name}</dd>
      <dt>Avatar</dt>
      <dd>
        <img src={user.avatarUrl} width="50" alt={user.login}/>
      </dd>
      <dt>Contributions</dt>
      <dd>{user.totalContributions}</dd>
      <dt>Followers</dt>
      <dd>{user.totalFollowers}</dd>
      <dt>Public repos</dt>
      <dd>{user.totalPublicRepos}</dd>
      <dt>Public gists</dt>
      <dd>{user.totalPublicGists}</dd>
    </dl>
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

    return (
      <div className={styles.root}>
        {orderings.map(ordering =>
          <button
            type="button"
            key={ordering}
            id={`ordering-${ordering}`}
            onClick={() => this.changeOrdering(ordering)}
            data-active={ordering === currentOrdering}
          >
            {ordering}
          </button>
        )}
        <ul>
          {userIds.map((id) => <RankingUser key={id} id={id} />)}
        </ul>
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
