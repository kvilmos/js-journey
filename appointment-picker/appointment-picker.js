const appointmentDiv = document.getElementById("appointment-section");

const OPEN_HOUR = 10;
const OPEN_MIN = 0;

const CLOSING_HOUR = 17;
const CLOSING_MIN = 0;

const TIME_GAP_IN_MIN = 30;
const MINS_IN_MS = 60000;

let appointments = [];
createAppointments();
loadAllAppointments();

function createAppointments() {
  appointments = [];
  let date = initializeFirstAppointment();
  while (date.getHours() < CLOSING_HOUR || date.getMinutes() < CLOSING_MIN) {
    appointments.push(new Date(date));
    date = incrementAppointment(date);
  }
}

function initializeFirstAppointment() {
  const openDate = new Date();
  openDate.setHours(OPEN_HOUR);
  openDate.setMinutes(OPEN_MIN);
  const startTime = openDate.getTime();

  const currentTime = new Date.getTime();
  const differenceInMs = currentTime - startTime;
  if (differenceInMs <= 0) {
    return new Date(startTime);
  }

  const timeGapInMs = TIME_GAP_IN_MIN * MINS_IN_MS;
  let elapsedGaps = Math.floor(differenceInMs / timeGapInMs);
  let newMinutes = differenceInMs % timeGapInMs === 0 ? 0 : TIME_GAP_IN_MIN;

  let date = new Date(startTime);
  date.setMinutes(elapsedGaps * TIME_GAP_IN_MIN + newMinutes);

  return date;
}

function incrementAppointment(date) {
  let newTimestamp = date.getTime();
  newTimestamp = newTimestamp + TIME_GAP_IN_MIN * MINS_IN_MS;
  return new Date(newTimestamp);
}

function loadAllAppointments() {
  appointmentDiv.innerHTML = "";

  for (let i = 0; i < appointments.length; i++) {
    const minutesStr = String(appointments[i].getMinutes()).padStart(2, 0);
    const dateText = `${appointments[i].getHours()}:${minutesStr}`;

    const appointmentBubbleDiv = document.createElement("div");
    appointmentBubbleDiv.innerHTML = `
      <input type="radio" id="appointment-${i}" name="appointments" value="${dateText}" />
      <label class="appointment-bubble" for="appointment-${i}">${dateText}</label>
    `;
    appointmentDiv.append(appointmentBubbleDiv);
  }
}
