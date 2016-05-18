import React, { PropTypes, Component } from 'react';
import { DataTable, TableHeader, IconButton, Tooltip } from 'react-mdl';

class RepositoryList extends Component {
  static propTypes = {
    requestGetGithubRepos: PropTypes.func.isRequired,
    trackGithubRepo: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.requestGetGithubRepos(this.props.github.accessToken);
  }

  actionFormatter(action, repoData) {
    return (
      <Tooltip label="Track repo">
        <IconButton
          name="add"
          onClick={() => this.props.trackGithubRepo(repoData.id)}
          raised ripple colored
        />
      </Tooltip>
    );
  }

  render() {
    const untrackedRepos = this.props.github.repos.filter(repo => !repo.tracked);

    return (
      <div>
        <h3>Repos</h3>
          <DataTable
            shadow={0}
            rows={untrackedRepos}
            rowKeyColumn="fullName"
          >
            <TableHeader name="fullName">Repo</TableHeader>
            <TableHeader
              name="action"
              cellFormatter={(action, repoData) => this.actionFormatter(action, repoData)}
            />
          </DataTable>
      </div>
    );
  }
}

export default RepositoryList;
