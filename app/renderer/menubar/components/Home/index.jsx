import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import ActiveJob from './ActiveJob';
import SelectJob from './SelectJob';


function Home({ job, startJob, stopJob, project }) {
  const activeJob = job.jobs.reduce(
    (previous, current) => (current.status === 'running' ? current : previous),
    null
  );

  return (
    <Grid>
      <Cell col={12}>
        {activeJob && <ActiveJob activeJob={activeJob} stopJob={stopJob} />}
        {!activeJob && <SelectJob project={project} startJob={startJob} />}
      </Cell>
    </Grid>
  );
}

Home.propTypes = {
  job: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  stopJob: PropTypes.func.isRequired,
  startJob: PropTypes.func.isRequired,
};

export default Home;
