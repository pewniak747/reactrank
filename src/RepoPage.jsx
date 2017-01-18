import React from 'react';
import { Link } from 'react-router';

import {
  getRepoById,
  getUserById,
} from './store';
import routes from './routes';

const UserContribution = ({ id, contributions }) => {
  const user = getUserById(id);

  return (
    <div>
      <dt>User</dt>
      <dd>
        <Link to={routes.user(id)}>
          {user.login}
        </Link>
      </dd>
      <dt>Contributions</dt>
      <dd>{contributions}</dd>
    </div>
  );
}

export default ({ params: { id } }) => {
  const repo = getRepoById(id);

  return (
    <div>
      Repo:
      <dl>
        <dt>ID</dt>
        <dd>{repo.id}</dd>
        <dt>Name</dt>
        <dd>{repo.name}</dd>
        <dt>Full name</dt>
        <dd>{repo.fullName}</dd>
        <dt>Stars</dt>
        <dd>{repo.stars}</dd>
      </dl>
      Contributions:
      {repo.users.map(({ id, contributions }) =>
        <UserContribution key={id} id={id} contributions={contributions} />
      )}
    </div>
  );
};
