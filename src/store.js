import rankings from '../data/processed/rankings.json';
import users from '../data/processed/users.json';
import repos from '../data/processed/repos.json';
import { mapKeys, camelCase } from 'lodash';

export const CONTRIBUTIONS = 'total_contributions';
export const FOLLOWERS = 'total_followers';
export const PUBLIC_REPOS = 'total_public_repos';
export const PUBLIC_GISTS = 'total_public_gists';

function mapKeysToCamelCase(obj) {
  return mapKeys(obj, (v, k) => camelCase(k));
};

export function getUserIdsRankedBy(attribute, count) {
  return rankings[attribute].slice(0, count);
};

export function getUserById(id) {
  return mapKeysToCamelCase(users[String(id)]);
};

export function getRepoById(id) {
  return mapKeysToCamelCase(repos[String(id)]);
};
