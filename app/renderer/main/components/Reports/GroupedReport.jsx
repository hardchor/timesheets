import React, { PropTypes } from 'react';
import Report from './Report';

function GroupedReport({ groupedJobs }) {
  return (
    <div>
      {Object.keys(groupedJobs).map(projectName => {
        const jobs = groupedJobs[projectName];

        return (
          <div>
            <h4>{projectName}</h4>
            <Report jobs={jobs} />
          </div>
        );
      })}
    </div>
  );
}

GroupedReport.propTypes = {
  groupedJobs: PropTypes.object.isRequired,
};

export default GroupedReport;
