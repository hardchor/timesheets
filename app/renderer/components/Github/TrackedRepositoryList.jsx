import React, { PropTypes } from 'react';

function TrackedRepositoryList({ untrackGithubRepo, github }) {
  const trackedRepos = github.repos.filter(repo => repo.tracked);

  function renderRepo(trackedRepo) {
    return (
      <tr key={trackedRepo.id}>
        <td>{trackedRepo.fullName}</td>
        <td>
          <button onClick={() => untrackGithubRepo(trackedRepo.id)}>Untrack</button>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <h1>Tracked Repos</h1>
      <table>
        <tbody>
          {trackedRepos.map(renderRepo)}
        </tbody>
      </table>
    </div>
  );
}

TrackedRepositoryList.propTypes = {
  untrackGithubRepo: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
};

export default TrackedRepositoryList;
