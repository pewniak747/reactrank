import React, { Component } from 'react';

import {
  CONTRIBUTIONS,
  FOLLOWERS,
  getUserIdsRankedBy,
  getUserById,
} from './store';

const RankingUser = ({ id }) => {
  const user = getUserById(id);
  console.log('Rerendering user', user);
  return (
    <dl>
      <dt>ID</dt>
      <dd>{user.id}</dd>
      <dt>Login</dt>
      <dd>{user.login}</dd>
      <dt>Name</dt>
      <dd>{user.name}</dd>
      <dt>Avatar</dt>
      <dd><img src={user.avatarUrl} width="50"/></dd>
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

class RankingPage extends Component {
  render() {
    const userIds = getUserIdsRankedBy(CONTRIBUTIONS);
    const filters = [CONTRIBUTIONS, FOLLOWERS];

    return (
      <div>
        <ul>
          {userIds.map((id) => <RankingUser key={id} id={id} />)}
        </ul>
      </div>
    );
  }
}

export default RankingPage;
