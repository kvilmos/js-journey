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

const START = 50;
const LIMIT = 100;
async function main() {
  const rotations = await readFile("input.txt");
  const password = crackSafe(rotations);
  console.log(`Result: ${password}`);
}
main();

function crackSafe(rotations) {
  let dial = START;
  let password = 0;

  for (let rot of rotations) {
    const amount = parseInt(rot.substring(1));
    if (rot.charAt(0) === "R") {
      dial += amount;
    } else if (rot.charAt(0) === "L") {
      dial += LIMIT - amount;
    }
    dial = dial % LIMIT;

    if (dial === 0) {
      password++;
    }
  }

  return password;
}
