import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../../config';
import RepositoryList from './RepositoryList';

function Github({ requestAuthenticateGithub, requestGetGithubRepos, trackGithubRepo, github }) {
  const grantedScopes = new Set(github.scope);
  const requiredScopes = config.github.scopes;
  const diff = requiredScopes.filter(item => !grantedScopes.has(item));

  const additionalScopesRequired = !!diff.length;
  const authRequired = !github.accessToken;

  return (
    <div>
      <Link to="/">back</Link>
      <h1>Github</h1>

      {additionalScopesRequired &&
        <div>
          <p>Additional permissions required</p>
          <button onClick={requestAuthenticateGithub}>Grant</button>
        </div>
      }

      {authRequired &&
        <div>
          <p>Log in with Github</p>
          <button onClick={requestAuthenticateGithub}>Connect</button>
        </div>
      }

      {!authRequired && !additionalScopesRequired &&
        <div>
          <RepositoryList
            requestGetGithubRepos={requestGetGithubRepos}
            trackGithubRepo={trackGithubRepo}
            github={github}
          />
        </div>
      }
    </div>
  );
}

Github.propTypes = {
  requestAuthenticateGithub: PropTypes.func.isRequired,
  requestGetGithubRepos: PropTypes.func.isRequired,
  trackGithubRepo: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
};

export default Github;
