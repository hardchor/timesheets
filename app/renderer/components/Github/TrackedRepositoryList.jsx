import React, { PropTypes } from 'react';

function TrackedRepositoryList({ github }) {
  function renderRepo(trackedRepo) {
    const repo = github.repos.reduce(
      (previous, current) => (current.id === trackedRepo.id ? current : previous)
    );

    return (
      <tr key={trackedRepo.id}>
        {repo && <td>{repo.fullName}</td>}
        {!repo && <td>`Repo with id ${trackedRepo.id} not found`</td>}
      </tr>
    );
  }

  return (
    <div>
      <h1>Tracked Repos</h1>
      <table>
        <tbody>
          {github.trackedRepos.map(renderRepo)}
        </tbody>
      </table>
    </div>
  );
}

TrackedRepositoryList.propTypes = {
  github: PropTypes.object.isRequired,
};

export default TrackedRepositoryList;
