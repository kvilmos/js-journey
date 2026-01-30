const dateNow = new Date();
console.log(dateNow);

// Date(year, month, day, hour, minute, second, ms)
const dateFromNumbers = new Date(2024, 0, 1, 2, 3, 4, 5);
console.log(dateFromNumbers);

const dateFromString = new Date("2024-01-02T12:00:00Z");
console.log(dateFromString);

const dateFromTimestamp = new Date(1500000);
console.log(dateFromTimestamp);

const year = dateNow.getFullYear();
const month = dateNow.getMonth();
const day = dateNow.getDate();
const hour = dateNow.getHours();
const minutes = dateNow.getMinutes();
const second = dateNow.getSeconds();

console.log(year);
console.log(month);
console.log(day);
console.log(hour);
console.log(minutes);
console.log(second);

const date = new Date();

date.setFullYear(2016);
date.setMonth(0);
date.setDate(1);
date.setHours(10);
date.setMinutes(0);
date.setSeconds(0);

console.log(date);

const date1 = new Date("2016-01-01");
const date2 = new Date("2016-12-31");
if (date1 < date2) {
  console.log("date1 < date 2");
} else {
  console.log("date1 >= date 2");
}
