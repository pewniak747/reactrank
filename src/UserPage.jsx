import React from 'react';
import { Link } from 'react-router';

import {
  getRepoById,
  getUserById,
} from './store';
import routes from './routes';

const UserContribution = ({ id, contributions }) => {
  const repo = getRepoById(id);

  return (
    <div>
      <dt>Repo</dt>
      <dd>
        <Link to={routes.repo(id)}>
          {repo.fullName}
        </Link>
      </dd>
      <dt>Contributions</dt>
      <dd>{contributions}</dd>
    </div>
  );
}

export default ({ params: { id } }) => {
  const user = getUserById(id);

  return (
    <div>
      Profile:
      <dl>
        <dt>ID</dt>
        <dd>{user.id}</dd>
        <dt>Login</dt>
        <dd>{user.login}</dd>
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
      Contributions:
      {user.contributions.map(({ id, contributions }) =>
        <UserContribution key={id} id={id} contributions={contributions} />
      )}
    </div>
  );
}
