const appointmentDiv = document.getElementById("appointment-section");

const firstAvailableTimestamp = [10, 0];
const closingTime = [17, 0];
const timeGap = 30;

loadAllAppointments();
function loadAllAppointments() {
  let time = firstAvailableTimestamp;
  appointmentDiv.innerHTML = "";
  while (time[0] !== closingTime[0]) {
    const timeDiv = document.createElement("div");
    const minStr = String(time[1]).padStart(2, 0);
    timeDiv.innerText = `${time[0]}:${minStr}`;
    time = incrementTime(time);
    appointmentDiv.append(timeDiv);
  }
}

function incrementTime(time) {
  const hour = time[0];
  const min = time[1];

  const newMin = min + timeGap;
  const newHour = hour + Math.floor(newMin / 60);

  return [newHour, newMin % 60];
}
