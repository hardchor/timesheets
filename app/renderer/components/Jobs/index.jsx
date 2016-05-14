import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
// import styles from './Jobs.css';

function Jobs({ startJob, pauseJob, stopJob, job }) {
  function renderJob(data) {
    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.startAt && moment(data.startAt).calendar()}</td>
        <td>{data.endAt && moment(data.endAt).calendar()}</td>
        <td>{data.endAt && moment(data.endAt).calendar()}</td>
        <td>{data.status}</td>
        <td>
          <a onClick={() => pauseJob(data.id)}>Pause</a>
          <a onClick={() => stopJob(data.id)}>End</a>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <Link to="/">back</Link>
      <h1>Jobs</h1>
      <a onClick={() => startJob()}>Start</a>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>startAt</th>
            <th>endAt</th>
            <th>duration</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {job.jobs.map(jobData => renderJob(jobData))}
        </tbody>
      </table>
    </div>
  );
}

Jobs.propTypes = {
  startJob: PropTypes.func.isRequired,
  pauseJob: PropTypes.func.isRequired,
  stopJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

export default Jobs;
