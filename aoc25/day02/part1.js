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
  const idPairs = await readFile("input.txt");
  const sum = sumInvalidIds(idPairs);
  console.log(`Result: ${sum}`);
}
main();

function sumInvalidIds(idRanges) {
  let sum = 0;
  for (let idPair of idRanges) {
    const range = idPair.split("-");

    const startId = parseInt(range[0]);
    const endId = parseInt(range[1]);
    for (i = startId; i <= endId; i++) {
      const idStr = `${i}`;
      if (idStr.length % 2 === 1) {
        continue;
      }

      const div = idStr.length / 2;
      const halfStr = idStr.substring(0, div);

      const possiblyInvalidIdStr = `${halfStr}${halfStr}`;
      const possiblyInvalidId = parseInt(possiblyInvalidIdStr);
      if (i !== possiblyInvalidId) {
        continue;
      }
      sum += possiblyInvalidId;
    }
  }

  return sum;
}
