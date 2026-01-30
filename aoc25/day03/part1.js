const fs = require("node:fs/promises");
const path = require("path");

async function readFile(fileName) {
  try {
    const filePath = path.join(__dirname, fileName);
    const data = await fs.readFile(filePath, "utf8");
    const array = data.split(/\r?\n/);

    return array;
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const banks = await readFile("input.txt");
  const sum = calculateTotalOutput(banks);
  console.log(`Result: ${sum}`);
}
main();

function calculateTotalOutput(banks) {
  let sum = 0;
  for (let batteries of banks) {
    sum += findLargestJoltage(batteries);
  }

  return sum;
}

function findLargestJoltage(batteries) {
  const bLength = batteries.length;
  let firstMax = parseInt(batteries[bLength - 2]);
  let secondMax = parseInt(batteries[bLength - 1]);

  for (let i = bLength - 3; i >= 0; i--) {
    const currentFirst = parseInt(batteries[i]);
    if (currentFirst >= firstMax) {
      if (currentFirst === firstMax) {
        if (firstMax > secondMax) {
          secondMax = firstMax;
        }
        firstMax = currentFirst;
      } else {
        if (firstMax > secondMax) {
          secondMax = firstMax;
        }
        firstMax = currentFirst;
      }
    }
  }

  const value = parseInt(`${firstMax}${secondMax}`);
  return value;
}
