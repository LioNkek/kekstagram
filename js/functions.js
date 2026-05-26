const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

const isMeetingValid = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartMinutes = convertTimeToMinutes(workStart);
  const workEndMinutes = convertTimeToMinutes(workEnd);
  const meetingStartMinutes = convertTimeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

// Проверки из задания:
console.log(isMeetingValid('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingValid('8:0', '10:0', '8:0', 120)); // true
console.log(isMeetingValid('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingValid('14:00', '17:30', '08:0', 90)); // false
console.log(isMeetingValid('8:00', '17:30', '08:00', 900)); // false
