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
    const untrackedRepos = this.props.github.repos.filter(repo => !repo.tracked);

    return (
      <div>
        <h1>Repos</h1>
          <table>
            <tbody>
              {untrackedRepos.map(repo => (
                <tr key={repo.fullName}>
                  <td>{repo.fullName}</td>
                  <td>
                    <button onClick={() => this.props.trackGithubRepo(repo.id)}>Track</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    );
  }
}

export default RepositoryList;
