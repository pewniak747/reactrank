const GithubApi = require('github');
const Promise = require('bluebird');
const promiseRatelimit = require('promise-ratelimit');
const fs = require('fs-extra');
const sleep = require('sleep');
const { flatten, uniq } = require('lodash');

const githubToken = process.env.GITHUB_TOKEN;
if(!githubToken) {
  console.log("GITHUB_TOKEN environment variable not set");
  console.log("Create your personal token at https://github.com/settings/tokens")
  process.exit(1);
}

const github = new GithubApi({
  Promise: Promise,
});
github.authenticate({
  type: "token",
  token: githubToken,
});

function getRemainingPages(res) {
  if (github.hasNextPage(res)) {
    return new Promise((resolve, reject) => {
      github.getNextPage(res).then((nextRes) => {
        getRemainingPages(nextRes).then((allPagesRes) => {
          resolve(res.concat(allPagesRes));
        }, reject);
      }, reject);
    });
  }
  else {
    return Promise.resolve(res);
  }
}

github.repos.getForOrg({
  org: "reactjs",
  page: 1,
  per_page: 100,
})
.then(getRemainingPages).then((res) => {
  console.log("Repos fetched");
  res = res.filter(repo => repo.size > 0);
  fs.outputJson('data/raw/repos.json', res);
  const contributorPromises = res.map((repo) => {
    return new Promise((resolve, reject) => {
      github.repos.getContributors({
        owner: repo.owner.login,
        repo: repo.name,
        page: 1,
        per_page: 100,
      }).then(getRemainingPages).then((res) => {
        fs.outputJson(`data/raw/contributors/${repo.name}.json`, res);
        console.log(repo.owner.login, repo.name);
        resolve(res);
      });
    });
  });
  Promise.all(contributorPromises).then((reposContributors) => {
    const userLogins = uniq(flatten(reposContributors).map(c => c.login));
    const throttle = promiseRatelimit(10);
    userLogins.forEach((userLogin) => {
      throttle().then(() => {
        github.users.getForUser({
          username: userLogin,
        }).then((res) => {
          fs.outputJson(`data/raw/users/${userLogin}.json`, res);
          console.log(userLogin);
        });
      });
    });
  });
});
