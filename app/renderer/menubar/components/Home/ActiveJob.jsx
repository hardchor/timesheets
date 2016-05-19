import React, { PropTypes } from 'react';
import { Button } from 'react-mdl';

function ActiveJob({ activeJob, stopJob }) {
  return (
    <div>
      <h3>Active job</h3>
      <div>{activeJob.projectName}</div>
      <div>{activeJob.startAt}</div>
      <Button onClick={() => stopJob(activeJob.id)}>Stop</Button>
    </div>
);
}

ActiveJob.propTypes = {
  activeJob: PropTypes.object.isRequired,
  stopJob: PropTypes.func.isRequired,
};

export default ActiveJob;
