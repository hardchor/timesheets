/* eslint-disable no-param-reassign */
import { START_JOB, STOP_JOB } from '../actions/job';

const initialState = {
  autoIncrementId: 0,
  jobs: []
};

export default function job(state = initialState, action) {
  switch (action.type) {
    case START_JOB:
      return {
        ...state,
        jobs: [
          ...state.jobs,
          {
            id: state.autoIncrementId,
            startAt: action.payload.time,
            status: 'running',
          },
        ],
        autoIncrementId: state.autoIncrementId + 1,
      };

    case STOP_JOB: {
      const jobs = state.jobs.map(jobData => {
        if (jobData.id === action.payload.id) {
          jobData.status = 'stopped';
          jobData.endAt = action.payload.time;
        }
        return jobData;
      });

      return {
        ...state,
        jobs,
      };
    }

    default:
      return state;
  }
}
