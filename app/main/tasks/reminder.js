import { scheduleJob } from 'node-schedule';
import moment from 'moment';

function parseTime(time) {
  const [hours, minutes = 0, seconds = 0] = (time && time.split(':')) || [];

  if (hours === undefined) return false;

  return {
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
  };
}

export default function reminder(store) {
  // every 5 seconds
  scheduleJob('*/5 * * * * *', () => {
    const {
      settings: {
        remindersEnabled,
        remindersFromTime,
        remindersToTime,
        remindersWeekdays,
      },
      job,
    } = store.getState();

    const remindersFrom = parseTime(remindersFromTime);
    const remindersTo = parseTime(remindersToTime);

    if (remindersEnabled && remindersFrom && remindersTo) {
      const now = moment();
      const fromTime = moment(remindersFrom);
      const toTime = moment(remindersTo);
      const activeJobsCount = job.jobs.reduce(
        (previous, current) => (current.status === 'running' ? previous + 1 : previous),
        0
      );

      if (
        !activeJobsCount &&
        now.isBetween(fromTime, toTime) &&
        !!remindersWeekdays[now.isoWeekday()]
      ) {
        console.log('##### DO SOMETHING YOU LAZY BUM');
      }
    }
  });
}
