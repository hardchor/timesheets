import React, { PropTypes, Component } from 'react';

class RepositoryList extends Component {
  static propTypes = {
    requestGetGithubRepos: PropTypes.func.isRequired,
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
            {repo.fullName}
          </li>
        ))}
      </div>
    );
  }
}

export default RepositoryList;
