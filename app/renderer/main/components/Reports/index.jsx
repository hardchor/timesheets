/* eslint-disable no-param-reassign */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Grid, Cell } from 'react-mdl';
import GroupedReport from './GroupedReport';
import ReportFilter from './ReportFilter';

const initialState = {
  groupDatesBy: 'day',
  fromDate: moment().startOf('week'),
  toDate: moment().endOf('week'),
};

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

function groupJobsByDate(jobs, groupedDates) {
  return jobs.reduce(
    (previous, current) => {
      const projectName = current.projectName || '';
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
}

class Reports extends Component {
  static propTypes = {
    job: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.state = initialState;
  }

  onSubmit({ fromDate, toDate, groupBy }) {
    this.setState({
      fromDate: moment(fromDate),
      toDate: moment(toDate),
      groupDatesBy: groupBy,
    });
  }

  render() {
    const { job } = this.props;
    const { fromDate, toDate, groupDatesBy } = this.state;

    // group by day
    const groupedDates = groupDates(fromDate, toDate, groupDatesBy);

    // filter by time
    const jobs = job.jobs.filter(jobData => {
      if (!jobData.endAt) return false;

      const endAt = moment(jobData.endAt);
      return endAt.isBetween(fromDate, toDate);
    });

    // group by project name
    const groupedJobs = groupJobsByDate(jobs, groupedDates);

    const initialValues = {
      ...initialState,
      fromDate: initialState.fromDate.format('YYYY-MM-DD'),
      toDate: initialState.toDate.format('YYYY-MM-DD'),
      groupBy: initialState.groupDatesBy,
    };

    return (
      <Grid>
        <Cell col={12}>
          <h1>Reports</h1>
          <ReportFilter onSubmit={data => this.onSubmit(data)} initialValues={initialValues} />

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
}

export default Reports;
