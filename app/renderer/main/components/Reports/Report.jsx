import React, { PropTypes } from 'react';
import moment from 'moment';

function Report({ jobs }) {
  const accumulatedTime = jobs.reduce(
    (previous, current) => {
      const duration = moment(current.endAt) - moment(current.startAt);
      return previous + duration;
    },
    0
  );
  return (
    <div>
      {moment.duration(accumulatedTime).humanize()}
    </div>
  );
}

Report.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default Report;
