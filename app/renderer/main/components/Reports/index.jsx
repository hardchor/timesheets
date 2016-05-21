/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import moment from 'moment';
import { Grid, Cell } from 'react-mdl';
import GroupedReport from './GroupedReport';

function Reports({ job }) {
  const groupDatesBy = 'day';
  const fromDate = moment().subtract(7, 'days').startOf(groupDatesBy);
  const toDate = moment().endOf(groupDatesBy);

  // group by day
  const groupedDates = [];
  const currentDate = moment(fromDate).endOf(groupDatesBy);
  do {
    const groupedFromDate = currentDate.clone().startOf(groupDatesBy);
    const groupedToDate = currentDate.clone().endOf(groupDatesBy);
    groupedDates.push({ groupedFromDate, groupedToDate });

    currentDate.add(1, groupDatesBy);
  } while (currentDate.isBefore(toDate));

  // filter by time
  const jobs = job.jobs.filter(jobData => {
    const endAt = jobData.endAt && moment(jobData.endAt);
    return endAt.isBetween(fromDate, toDate);
  });

  // group by project name
  const groupedJobs = jobs.reduce(
    (previous, current) => {
      const projectName = current.projectName || 'No project assigned';
      const endAt = current.endAt && moment(current.endAt);

      previous[projectName] = previous[projectName] || {};

      groupedDates.forEach(({ groupedFromDate, groupedToDate }) => {
        if (endAt.isBetween(groupedFromDate, groupedToDate)) {
          const id = groupedFromDate.toString();
          previous[projectName][id] = previous[projectName][id] || [];
          previous[projectName][id].push(current);
        }
      });

      return previous;
    },
    {}
  );

  return (
    <Grid>
      <Cell col={12}>
        <h1>Reports</h1>
        <small>{fromDate.calendar()} - {toDate.calendar()}</small>
        <GroupedReport
          groupDatesBy={groupDatesBy}
          groupedDates={groupedDates}
          groupedJobs={groupedJobs}
        />
      </Cell>
    </Grid>
  );
}

Reports.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Reports;
