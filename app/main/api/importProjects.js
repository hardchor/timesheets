import { jsonAggregator } from '../../shared/helpers/fetch';
import getIssues from './getIssues';
import getMilestones from './getMilestones';

export default function importProjects(accessToken, repoFullName) {
  return Promise.all([
    getIssues(accessToken, repoFullName),
    getMilestones(accessToken, repoFullName),
  ])
  .then(jsonAggregator);
}
