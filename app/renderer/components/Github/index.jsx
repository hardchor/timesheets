import React, { PropTypes } from 'react';
import { Grid, Cell, Button } from 'react-mdl';
import config from '../../../config';
import RepositoryList from './RepositoryList';
import TrackedRepositoryList from './TrackedRepositoryList';

function Github({
  requestAuthenticateGithub,
  requestGetGithubRepos,
  trackGithubRepo,
  untrackGithubRepo,
  requestImportGithubProjects,
  github,
}) {
  const grantedScopes = new Set(github.scope);
  const requiredScopes = config.github.scopes;
  const diff = requiredScopes.filter(item => !grantedScopes.has(item));

  const authRequired = !github.accessToken;
  const additionalScopesRequired = !!diff.length;

  return (
    <Grid>
      <Cell col={12}>
        <h1>Github</h1>

        {authRequired &&
          <div>
            <p>Log in with Github</p>
            <Button onClick={requestAuthenticateGithub} raised accent ripple>Connect</Button>
          </div>
        }

        {!authRequired && additionalScopesRequired &&
          <div>
            <p>
              Additional permissions required:
              <pre>{diff.join(', ')}</pre>
            </p>
            <Button onClick={requestAuthenticateGithub} raised accent ripple>Grant</Button>
          </div>
        }

        {!authRequired && !additionalScopesRequired &&
          <div>
            <TrackedRepositoryList
              untrackGithubRepo={untrackGithubRepo}
              requestImportGithubProjects={requestImportGithubProjects}
              github={github}
            />
            <RepositoryList
              requestGetGithubRepos={requestGetGithubRepos}
              trackGithubRepo={trackGithubRepo}
              github={github}
            />
          </div>
        }
      </Cell>
    </Grid>
  );
}

Github.propTypes = {
  requestAuthenticateGithub: PropTypes.func.isRequired,
  requestGetGithubRepos: PropTypes.func.isRequired,
  trackGithubRepo: PropTypes.func.isRequired,
  untrackGithubRepo: PropTypes.func.isRequired,
  requestImportGithubProjects: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
};

export default Github;
