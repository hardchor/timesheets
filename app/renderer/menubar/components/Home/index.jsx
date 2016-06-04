import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import ActiveJob from './ActiveJob';
import SelectJob from './SelectJob';
import NoProjects from './NoProjects';


function Home({ project, job, startJob, stopJob, settings, setRemindersEnabled }) {
  const activeJob = job.jobs.reduce(
    (previous, current) => (current.status === 'running' ? current : previous),
    null
  );

  return (
    <Grid>
      <Cell col={12}>
        {activeJob &&
          <ActiveJob activeJob={activeJob} stopJob={stopJob} />
        }
        {!activeJob &&
          <SelectJob
            project={project}
            startJob={startJob}
            settings={settings}
            setRemindersEnabled={setRemindersEnabled}
          />
        }
        {!activeJob && !project.projects.length &&
          <NoProjects />
        }
      </Cell>
    </Grid>
  );
}

Home.propTypes = {
  project: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  stopJob: PropTypes.func.isRequired,
  startJob: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  setRemindersEnabled: PropTypes.func.isRequired,
};

export default Home;
