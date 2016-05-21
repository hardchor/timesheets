import React, { PropTypes } from 'react';
import { DataTable, TableHeader } from 'react-mdl';
import moment from 'moment';

function GroupedReport({ groupedDates, groupedJobs }) {
  const rows = Object.keys(groupedJobs).map(projectName => {
    const jobsGroupedByDate = groupedJobs[projectName];
    const durationsGroupedByDate = {};

    Object.keys(jobsGroupedByDate).forEach(groupedFromDate => {
      const jobs = jobsGroupedByDate[groupedFromDate];

      // accumulate time per time group
      const accumulatedTime = jobs.reduce(
        (previous, current) => {
          const duration = moment(current.endAt) - moment(current.startAt);
          return previous + duration;
        },
        0
      );

      durationsGroupedByDate[groupedFromDate] = accumulatedTime;
    });

    return {
      projectName,
      ...durationsGroupedByDate,
    };
  });

  function durationFormatter(accumulatedTime) {
    const duration = moment.duration(accumulatedTime);
    return accumulatedTime && duration.humanize();
  }

  return (
    <DataTable
      shadow={0}
      rows={rows}
    >
      <TableHeader name="projectName">Project</TableHeader>
      {groupedDates.map(groupedDate => (
        <TableHeader
          key={groupedDate.groupedFromDate.toString()}
          name={groupedDate.groupedFromDate.toString()}
          cellFormatter={durationFormatter}
          numeric
        >
          {groupedDate.groupedFromDate.format('L')}
        </TableHeader>
      ))}
    </DataTable>
  );
}

GroupedReport.propTypes = {
  groupedDates: PropTypes.array.isRequired,
  groupedJobs: PropTypes.object.isRequired,
};

export default GroupedReport;
