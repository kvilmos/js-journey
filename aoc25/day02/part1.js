const fs = require("node:fs/promises");
const path = require("path");

async function readFile(fileName) {
  try {
    const filePath = path.join(__dirname, fileName);
    const data = await fs.readFile(filePath, "utf8");
    const array = data.split(",");

    return array;
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
        sum += possiblyInvalidId;
      }
    }
  }

  return sum;
}

//18893502033
