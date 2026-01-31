const appointmentDiv = document.getElementById("appointment-section");

const firstAppointment = {
  hour: 10,
  minutes: 0,
};
const closingTime = {
  hour: 17,
  minutes: 0,
};
const timeGap = 30;

const minuteInMilliseconds = 60000;
loadAllAppointments();

function loadAllAppointments() {
  appointmentDiv.innerHTML = "";
  let date = initializeFirstAppointment();
  let closeDate = new Date();
  closeDate.setHours(closingTime.hour);
  closeDate.setMinutes(closingTime.minutes);

  while (date <= closeDate) {
    const appointmentBubbleDiv = document.createElement("div");
    const minutesStr = String(date.getMinutes()).padStart(2, 0);
    appointmentBubbleDiv.innerText = `${date.getHours()}:${minutesStr}`;
    incrementAppointment(date);
    appointmentDiv.append(appointmentBubbleDiv);
  }
}

function initializeFirstAppointment() {
  let currentTime = new Date().getTime();

  let startAppointment = new Date();
  startAppointment.setHours(firstAppointment.hour);
  startAppointment.setMinutes(firstAppointment.minutes);
  const startTime = startAppointment.getTime();

  const timeDifference = currentTime - startTime;
  if (timeDifference <= 0) {
    return new Date(startTime);
  }

  let newMinutes = timeDifference % timeGap === 0 ? 0 : timeGap;
  let elapsedGaps = Math.floor(
    timeDifference / (timeGap * minuteInMilliseconds),
  );

  let date = new Date();
  date.setMinutes(elapsedGaps * timeGap + newMinutes);

  return date;
}

function incrementAppointment(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const newMinutes = (minutes + timeGap) % 60;
  const newHour = hours + Math.floor((minutes + timeGap) / 60);

  date.setHours(newHour);
  date.setMinutes(newMinutes);

  return date;
}
