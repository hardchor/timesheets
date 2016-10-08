import React, { PropTypes, Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

class RepositoryList extends Component {
  static propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    trackGithubRepo: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getGithubRepos(this.props.github.accessToken);
  }

  render() {
    const untrackedRepos = this.props.github.repos
      .filter(repo => !repo.tracked)
      .map(({ id, fullName }) => ({
        value: id,
        label: fullName,
      }));

    return (
      <div>
        <h3>Repos</h3>
        <VirtualizedSelect
          name="repos"
          options={untrackedRepos}
          onChange={({ value }) => this.props.trackGithubRepo(value)}
        />
      </div>
    );
  }
}

export default RepositoryList;
