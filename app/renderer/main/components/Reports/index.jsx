/* eslint-disable no-param-reassign */
import React, { PropTypes } from 'react';
import moment from 'moment';
import { Grid, Cell } from 'react-mdl';
import GroupedReport from './GroupedReport';

function groupDates(fromDate, toDate, groupBy) {
  const groupedDates = [];
  const currentDate = moment(fromDate).endOf(groupBy);
  while (currentDate.isSameOrBefore(toDate)) {
    const groupedFromDate = currentDate.clone().startOf(groupBy);
    const groupedToDate = currentDate.clone().endOf(groupBy);
    groupedDates.push({ groupedFromDate, groupedToDate });

    currentDate.add(1, groupBy);
  }

  return groupedDates;
}

function Reports({ job }) {
  const groupDatesBy = 'day';
  const fromDate = moment().startOf('week');
  const toDate = moment().endOf(groupDatesBy);

  // group by day
  const groupedDates = groupDates(fromDate, toDate, groupDatesBy);

  // filter by time
  const jobs = job.jobs.filter(jobData => {
    if (!jobData.endAt) return false;

    const endAt = moment(jobData.endAt);
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
