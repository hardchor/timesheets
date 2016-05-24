import React, { PropTypes } from 'react';
import { Button, List, ListItem, ListItemContent, ListItemAction } from 'react-mdl';
import moment from 'moment';
import style from './activeJob.css';

function ActiveJob({ activeJob, stopJob }) {
  const [projectCode, projectName] = activeJob.projectName.split('#');

  return (
    <div>
      <List className={style.list}>
        <ListItem>
          <ListItemContent avatar="timer">
            <strong>{projectCode || projectName}</strong><br />
            {projectCode && projectName}<br />
            <small>{moment(activeJob.startAt).fromNow()}</small>
          </ListItemContent>
          <ListItemAction>
            <Button onClick={() => stopJob(activeJob.id)} raised accent ripple>Done</Button>
          </ListItemAction>
        </ListItem>
      </List>
    </div>
  );
}

ActiveJob.propTypes = {
  activeJob: PropTypes.object,
  stopJob: PropTypes.func.isRequired,
};

export default ActiveJob;
