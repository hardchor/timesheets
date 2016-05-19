import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import ActiveJob from './ActiveJob';


function Home({ job, stopJob }) {
  const activeJob = job.jobs.reduce(
    (previous, current) => (current.status === 'running' ? current : previous),
    null
  );

  return (
    <Grid>
      <Cell col={12}>
        <h2>Menu Bar</h2>
        <p>Any drinks?</p>

        <ActiveJob activeJob={activeJob} stopJob={stopJob} />
      </Cell>
    </Grid>
  );
}

Home.propTypes = {
  job: PropTypes.object.isRequired,
  stopJob: PropTypes.func.isRequired,
};

export default Home;
