import React, { PropTypes, Component } from 'react';

class RepositoryList extends Component {
  static propTypes = {
    requestGetGithubRepos: PropTypes.func.isRequired,
    trackGithubRepo: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.requestGetGithubRepos(this.props.github.accessToken);
  }

  render() {
    return (
      <div>
        <h1>Repos</h1>
        {this.props.github.repos.map(repo => (
          <li key={repo.fullName}>
            <button onClick={() => this.props.trackGithubRepo(repo.id)}>Track</button>
            {repo.fullName}
          </li>
        ))}
      </div>
    );
  }
}

export default RepositoryList;
