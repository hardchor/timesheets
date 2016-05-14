/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import assert from 'assert';
import {
  AUTHENTICATE_GITHUB, authenticateGithub,
  GET_GITHUB_REPOS, getGithubRepos,
} from '../../actions/github';

const aliases = {
  [AUTHENTICATE_GITHUB]: authenticateGithub,
  [GET_GITHUB_REPOS]: getGithubRepos,
};

const triggerAlias = store => next => action => {
  if (
    action.meta &&
    action.meta.trigger
  ) {
    assert(aliases[action.meta.trigger], `Trigger ${action.meta.trigger} not found`);
    const args = action.payload || [];

    // trigger alias
    action = aliases[action.meta.trigger](...args);
  }

  return next(action);
};

export default triggerAlias;
