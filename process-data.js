const fs = require('fs-extra');
const _ = require('lodash');
const sortBy = _.sortBy;
const sumBy = _.sumBy;

/* user
 * id: {
 *   id: 0,
 *   login: "",
 *   name: "",
 *   avatar_url: "",
 *   total_followers: 0,
 *   total_public_repos: 0,
 *   total_public_gists: 0,
 *   total_contributions: 0,
 *   repos: [{
 *    id: 0,
 *    contributions: 0,
 *   }]
 * }
 *
 * repo
 * id: {
 *   id: 0,
 *   name: "",
 *   full_name: "",
 *   description: "",
 *   users: [{
 *    id: 0,
 *    contributions: 0
 *   }]
 * }
 */

const rawRepos = fs.readJsonSync('data/raw/repos.json');
const repos = {};
const userNames = new Set();
const userContributions = {};
const parsedRepos = rawRepos.forEach((repo) => {
  const { id, name, full_name, description } = repo;
  const rawUsers = fs.readJsonSync(`data/raw/contributors/${repo.name}.json`);
  rawUsers.forEach(u => userNames.add(u.login));
  const users = rawUsers.map(u => ({
    id: u.id,
    contributions: u.contributions,
  }));
  users.forEach((u) => {
    userContributions[u.id] = userContributions[u.id] || [];
    userContributions[u.id].push({
      id,
      contributions: u.contributions,
    })
  });

  repos[id] = {
    id,
    name,
    full_name,
    description,
    users,
  };
});
fs.outputJson('data/processed/repos.json', repos, { space: null });

const users = {};
userNames.forEach((userName) => {
  const fileName = `data/raw/users/${userName}.json`
  if (fs.existsSync(fileName)) {
    const rawUser = fs.readJsonSync(fileName);
    const {
      id,
      login,
      name,
      avatar_url,
      followers: total_followers,
      public_repos: total_public_repos,
      public_gists: total_public_gists,
    } = rawUser;
    const contributions = sortBy(userContributions[id] || [], u => -u.contributions);
    const total_contributions = sumBy(contributions, u => u.contributions);
    users[id] = {
      id,
      login,
      name,
      avatar_url,
      total_contributions,
      total_followers,
      total_public_repos,
      total_public_gists,
      contributions,
    };
  }
});
fs.outputJson('data/processed/users.json', users);

const rankings = {};

function rankingBy(attribute) {
  return rankings[attribute] = sortBy(users, u => -u[attribute]).map(u => u.id);
};

rankings['total_followers'] = rankingBy('total_followers');
rankings['total_public_repos'] = rankingBy('total_public_repos');
rankings['total_public_gists'] = rankingBy('total_public_gists');
rankings['total_contributions'] = rankingBy('total_contributions');
fs.outputJson('data/processed/rankings.json', rankings);
