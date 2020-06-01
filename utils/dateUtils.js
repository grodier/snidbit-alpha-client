export function calculateTimeSince(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var intervals = [
    {
      type: 'year',
      seconds: 31536000,
    },
    {
      type: 'month',
      seconds: 2592000,
    },
    {
      type: 'day',
      seconds: 86400,
    },
    {
      type: 'hour',
      seconds: 3600,
    },
    {
      type: 'minute',
      seconds: 60,
    },
  ];

  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds;
  let intervalType = 'second';
  for (let i = 0; i < intervals.length; i++) {
    const newInterval = Math.floor(seconds / intervals[i].seconds);
    if (newInterval >= 1) {
      intervalType = intervals[i].type;
      interval = newInterval;
      break;
    }
  }

  if (interval > 1) {
    intervalType += 's';
  }

  return `${interval} ${intervalType}`;
}
