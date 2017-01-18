import rankings from '../data/processed/rankings.json';
import users from '../data/processed/users.json';
import { mapKeys, camelCase } from 'lodash';

export const CONTRIBUTIONS = 'total_contributions';
export const FOLLOWERS = 'total_followers';
export const PUBLIC_REPOS = 'total_public_repos';
export const PUBLIC_GISTS = 'total_public_gists';

function mapKeysToCamelCase(obj) {
  return mapKeys(obj, (v, k) => camelCase(k));
};

export function getUserIdsRankedBy(attribute) {
  return rankings[attribute].slice(0, 10);
};

export function getUserById(id) {
  return mapKeysToCamelCase(users[String(id)]);
};
