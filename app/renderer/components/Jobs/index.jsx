import React, { PropTypes } from 'react';
import moment from 'moment';
import { Grid, Cell, DataTable, TableHeader, Button, Icon, IconButton } from 'react-mdl';

function Jobs({ startJob, stopJob, removeJob, job }) {
  function statusFormatter(status) {
    return status === 'stopped' ? <Icon className="mdl-color-text--green-400" name="done" /> : null;
  }

  function actionFormatter(status, jobData) {
    if (jobData.status === 'running') {
      return (
        <IconButton name="stop" raised accent ripple onClick={() => stopJob(jobData.id)} />
      );
    }
    return <IconButton name="delete" raised ripple onClick={() => removeJob(jobData.id)} />;
  }

  const rows = job.jobs.map((project) => {
    const startAt = project.startAt && moment(project.startAt);
    const endAt = project.endAt && moment(project.endAt);
    const duration = startAt && endAt && moment.duration(endAt.diff(startAt));

    return {
      ...project,
      startAt,
      endAt,
      duration,
    };
  });

  return (
    <Grid>
      <Cell col={6} tablet={12}>
        <h1>Jobs</h1>
        <Button onClick={() => startJob()}>Start</Button>

        <DataTable
          shadow={0}
          rows={rows}
          rowKeyColumn="id"
        >
          <TableHeader name="status" cellFormatter={statusFormatter} />
          <TableHeader name="projectName">Project</TableHeader>
          <TableHeader name="startAt" cellFormatter={(date) => date && date.calendar()}>
            Start
          </TableHeader>
          <TableHeader name="endAt" cellFormatter={(date) => date && date.calendar()}>
            End
          </TableHeader>
          <TableHeader name="duration" cellFormatter={(dur) => dur && dur.humanize()}>
            Duration
          </TableHeader>
          <TableHeader name="action" cellFormatter={actionFormatter} />
        </DataTable>
      </Cell>
    </Grid>
  );
}

// {data.status === 'running' && <button onClick={() => stopJob(data.id)}>End</button>}
// <button onClick={() => removeJob(data.id)}>Remove</button>

Jobs.propTypes = {
  startJob: PropTypes.func.isRequired,
  stopJob: PropTypes.func.isRequired,
  removeJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
};

export default Jobs;
