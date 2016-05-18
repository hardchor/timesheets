import React, { PropTypes } from 'react';
import { DataTable, TableHeader, IconButton, Tooltip } from 'react-mdl';
import styles from './github.css';

function TrackedRepositoryList({ untrackGithubRepo, requestImportGithubProjects, github }) {
  const trackedRepos = github.repos.filter(repo => repo.tracked);
  const { accessToken } = github;

  function actionFormatter(action, { id, fullName }) {
    return (
      <div>
        <Tooltip label="Import projects">
          <IconButton
            onClick={() => requestImportGithubProjects(accessToken, fullName)}
            name="sync"
            className={styles.actionButton}
            raised ripple accent
          />
        </Tooltip>
        <Tooltip label="Untrack repo">
          <IconButton
            onClick={() => untrackGithubRepo(id)}
            name="remove"
            className={styles.actionButton}
            raised ripple colored
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <div>
      <h3>Tracked Repos</h3>
      <DataTable
        shadow={0}
        rows={trackedRepos}
        rowKeyColumn="fullName"
      >
        <TableHeader name="fullName">Repo</TableHeader>
        <TableHeader
          name="action"
          cellFormatter={(action, repoData) => actionFormatter(action, repoData)}
        />
      </DataTable>
    </div>
  );
}

TrackedRepositoryList.propTypes = {
  untrackGithubRepo: PropTypes.func.isRequired,
  requestImportGithubProjects: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
};

export default TrackedRepositoryList;
