/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import moment from 'moment';
import {
  Grid,
  Cell,
} from 'react-mdl';
import GroupedReport from './GroupedReport';

function Reports({ job }) {
  const fromDate = moment().subtract(1, 'weeks');
  const toDate = moment();
  // filter by time
  const jobs = job.jobs.filter(jobData => {
    const endAt = jobData.endAt && moment(jobData.endAt);
    return endAt >= fromDate && endAt <= toDate;
  });

  // group by project name
  const groupedJobs = jobs.reduce(
    (previous, current) => {
      const projectName = current.projectName || 'No project assigned';

      previous[projectName] = previous[projectName] || [];
      previous[projectName].push(current);

      return previous;
    },
    {}
  );

  return (
    <Grid>
      <Cell col={12}>
        <h1>Reports</h1>
        <small>{fromDate.calendar()} - {toDate.calendar()}</small>

        <GroupedReport groupedJobs={groupedJobs} />
      </Cell>
    </Grid>
  );
}

Reports.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Reports;
