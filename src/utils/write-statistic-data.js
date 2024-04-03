export default function writeStatisticData(statistic, time, numObj) {
  statistic.addTime(time);
  statistic.numObjects = numObj;
} 
