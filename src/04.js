const R = require("ramda");
const lib = require("./lib");

const getGuardId = e => e.split("Guard #")[1].split(" ")[0];
const getMinute = e =>
  e
    .split("]")[0]
    .split(" ")[1]
    .split(":")[1];
const minuteArray = new Array(60).fill([]);
const getLargestSleeper = timesheet =>
  R.reduce(
    R.maxBy(a => (a === Infinity ? -Infinity : a.length)),
    Infinity,
    R.groupWith(R.equals, R.flatten(timesheet).sort())
  )[0];
const getMostFrequentMin = (timesheet, sleeperId) =>
  timesheet
    .map(minute => minute.filter(id => id === sleeperId))
    .reduce(
      (acc, cur, idx, src) =>
        cur.length > src[acc.index].length
          ? {
              index: idx,
              sleeperId,
              frequency: cur.length
            }
          : acc,
      {
        index: 0,
        sleeperId,
        frequency: 0
      }
    );

exports.getLargestSleeper = function(input) {
  const timesheetInfo = input.sort().reduce(
    (acc, e) => {
      const { activeGuard, date, sleepTime, timesheet } = acc;

      if (e.includes("asleep")) {
        return {
          activeGuard,
          sleepTime: getMinute(e),
          date,
          timesheet
        };
      }
      if (e.includes("wakes")) {
        return {
          activeGuard,
          sleepTime: null,
          date,
          timesheet: timesheet.map((item, index) =>
            sleepTime <= index && index < getMinute(e)
              ? [...item, activeGuard]
              : item
          )
        };
      }
      if (e.includes("Guard")) {
        return {
          activeGuard: getGuardId(e),
          sleepTime,
          date,
          timesheet
        };
      }

      return acc;
    },
    {
      activeGuard: null,
      date: null,
      sleepTime: null,
      timesheet: minuteArray
    }
  );
  const largestSleeper = getLargestSleeper(timesheetInfo.timesheet);
  const mostMinute = getMostFrequentMin(
    timesheetInfo.timesheet,
    largestSleeper
  );
  return {
    firstStrategy: largestSleeper * mostMinute.index,
    secondStrategy: null
  };
};
const largestSleeper = this.getLargestSleeper(lib.getInput("04"));
console.log(
  `Largest sleeper by first strategy: ${largestSleeper.firstStrategy}`
);
