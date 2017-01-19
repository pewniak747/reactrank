import React from 'react';
import { Link } from 'react-router';

import {
  getRepoById,
  getUserById,
} from './store';
import routes from './routes';
import Octicon from './Octicon';
import styles from './UserPage.css';

const RepoContribution = ({ id, contributions }) => {
  const repo = getRepoById(id);

  return (
    <Link to={routes.repo(id)} className={styles.repo}>
      <div>
        <Octicon className={styles.repoStatIcon} name="repo" />
        {repo.fullName}
      </div>
      <div className={styles.repoStat}>
        {contributions}
        <Octicon className={styles.repoStatIcon} name="git-commit" />
      </div>
    </Link>
  );
}

export default ({ params: { id } }) => {
  const user = getUserById(id);
  const site = `github.com/${user.login}`;
  const url = `https://${site}`;

  return (
    <div className={styles.root}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src={user.avatarUrl} alt={user.login} />
        </div>
        <div className={styles.info}>
          <If condition={user.name}>
            <h1>{user.name}</h1>
          </If>
          <h2>
            <a href={url} target="_blank">{site}</a>
          </h2>
        </div>
        <div className={styles.stats}>
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
        </div>
      </div>
      <div className={styles.repos}>
        {user.contributions.map(({ id, contributions }) =>
          <RepoContribution key={id} id={id} contributions={contributions} />
        )}
      </div>
    </div>
  );
}
