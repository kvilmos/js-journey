const fs = require("node:fs/promises");
const { parse } = require("node:path");
const path = require("path");

async function readFile(fileName) {
  try {
    const filePath = path.join(__dirname, fileName);
    const data = await fs.readFile(filePath, "utf8");
    const array = data.split(/\r?\n/);

    const res = [];
    for (let value of array) {
      const split = value.split(",");
      for (let pair of split) {
        res.push(pair);
      }
    }

    return res;
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const ids = await readFile("input.txt");
  const sum = findInvalidIDs(ids);
  console.log(`Result: ${sum}`);
}
main();

function findInvalidIDs(array) {
  let sum = 0;
  for (let pair of array) {
    if (pair === "") {
      continue;
    }
    const idSplit = pair.split("-");

    const startId = parseInt(idSplit[0]);
    const endId = parseInt(idSplit[1]);

    for (i = startId; i <= endId; i++) {
      const idStr = `${i}`;
      if (idStr.length % 2 === 1) {
        continue;
      }
      const div = idStr.length / 2;
      const halfStr = idStr.substring(0, div);

      const possiblyInvalidIdStr = `${halfStr}${halfStr}`;
      const possiblyInvalidId = parseInt(possiblyInvalidIdStr);
      if (
        i === possiblyInvalidId &&
        startId <= possiblyInvalidId &&
        endId >= possiblyInvalidId
      ) {
        console.log(possiblyInvalidId);
        sum += possiblyInvalidId;
      }
    }
  }

  return sum;
}
