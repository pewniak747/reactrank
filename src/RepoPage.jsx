import React from 'react';
import { Link } from 'react-router';

import {
  getRepoById,
  getUserById,
} from './store';
import routes from './routes';

import Octicon from './Octicon';
import styles from './RepoPage.css';

const UserContribution = ({ id, contributions }) => {
  const user = getUserById(id);

  return (
    <Link to={routes.user(id)} className={styles.user}>
      <img src={user.avatarUrl} className={styles.userAvatar} alt={user.login} />
      <div className={styles.userLogin}>
        {user.login}
      </div>
      <div className={styles.userStat}>
        {contributions}
        <Octicon className={styles.userStatIcon} name="git-commit" />
      </div>
    </Link>
  );
}

export default ({ params: { id } }) => {
  const repo = getRepoById(id);
  const url = `https://github.com/${repo.fullName}`

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <a href={url} target="_blank" className={styles.link}>
          {repo.fullName}
        </a>
        <If condition={repo.description}>
          <p>{repo.description}</p>
        </If>
      </div>
      <div className={styles.users}>
        {repo.users.map(({ id, contributions }) =>
          <UserContribution key={id} id={id} contributions={contributions} />
        )}
      </div>
    </div>
  );
};
