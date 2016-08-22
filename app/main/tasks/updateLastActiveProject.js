import { scheduleJob } from 'node-schedule';
import { getGithubIssuesAssignedToUser } from '../../shared/actions/github';

export default function updateLastActiveProject(store) {
  function doUpdate() {
    // get access token
    const {
      github: {
        accessToken,
      },
    } = store.getState();

    if (accessToken) {
      store.dispatch(getGithubIssuesAssignedToUser(accessToken));
    }
  }

  // every 5 minutes
  scheduleJob('*/5 * * * *', doUpdate);

  // immediately
  doUpdate();
}
