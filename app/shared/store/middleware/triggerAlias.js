/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import assert from 'assert';
import { AUTHENTICATE_GITHUB, authenticateGithub } from '../../actions/github';

const aliases = {
  [AUTHENTICATE_GITHUB]: authenticateGithub,
};

const triggerAlias = store => next => action => {
  if (
    action.meta &&
    action.meta.trigger
  ) {
    assert(aliases[action.meta.trigger], `Trigger ${action.meta.trigger} not found`);

    // trigger alias
    action = aliases[action.meta.trigger]();
  }

  return next(action);
};

export default triggerAlias;
