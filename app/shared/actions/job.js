export const START_JOB = 'START_JOB';
export const PAUSE_JOB = 'PAUSE_JOB';
export const STOP_JOB = 'STOP_JOB';


export function startJob(time = new Date()) {
  return {
    type: START_JOB,
    payload: {
      time,
    },
    meta: {
      scope: 'main',
    },
  };
}

export function pauseJob(id, time = new Date()) {
  return {
    type: PAUSE_JOB,
    payload: {
      id,
      time,
    },
    meta: {
      scope: 'main',
    },
  };
}

export function stopJob(id, time = new Date()) {
  return {
    type: STOP_JOB,
    payload: {
      id,
      time,
    },
    meta: {
      scope: 'main',
    },
  };
}
