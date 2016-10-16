/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import config from '../../../../config';
import RepositoryList from './RepositoryList';
import TrackedRepositoryList from './TrackedRepositoryList';
import GithubAuth from './GithubAuth';

// TODO: link to unlink account (remove token via API + delete from state)
function Github({
  authenticateGithub,
  getGithubRepos,
  trackGithubRepo,
  untrackGithubRepo,
  importGithubProjects,
  github,
  project,
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
          <GithubAuth
            onSubmit={({ username, password, twofa }) => authenticateGithub(username, password, twofa)}
            github={github}
          />
        }

        {additionalScopesRequired && <div>Give me more permissions</div>}

        {!authRequired && !additionalScopesRequired &&
          <div>
            <RepositoryList
              getGithubRepos={getGithubRepos}
              trackGithubRepo={trackGithubRepo}
              github={github}
            />
            <TrackedRepositoryList
              untrackGithubRepo={untrackGithubRepo}
              importGithubProjects={importGithubProjects}
              github={github}
              project={project}
            />
          </div>
        }
      </Cell>
    </Grid>
  );
}

Github.propTypes = {
  authenticateGithub: PropTypes.func.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  trackGithubRepo: PropTypes.func.isRequired,
  untrackGithubRepo: PropTypes.func.isRequired,
  importGithubProjects: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

export default Github;
