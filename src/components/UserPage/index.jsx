import React from 'react';
import { Link } from 'react-router';

import {
  getRepoById,
  getUserById,
} from 'store';
import routes from 'routes';
import Octicon from 'components/Octicon';
import styles from './style.css';

const RepoContribution = ({ id, contributions }) => {
  const repo = getRepoById(id);

  return (
    <Link to={routes.repo(id)} className={styles.repo}>
      <div className={styles.repoName}>
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
  const url = `https://github.com/${user.login}`;

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
            <a href={url} target="_blank" className={styles.link}>
              <Octicon name="mark-github" />
              &nbsp;
              {user.login}
            </a>
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
        <For each="repo" of={user.contributions}>
          <RepoContribution
            key={repo.id}
            id={repo.id}
            contributions={repo.contributions}
          />
        </For>
      </div>
    </div>
  );
}
