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
    for (let i = startId; i <= endId; i++) {
      const idStr = `${i}`;
      const length = idStr.length;

      const halfLength = Math.floor(idStr.length / 2);
      const halfIdStr = idStr.substring(0, halfLength);
      let added = false;
      for (let k = halfLength - 1; k >= 0; k--) {
        const times = Math.floor(length / (k + 1));
        let possiblyInvalidIdStr = "";
        const pattern = halfIdStr.substring(0, k + 1);
        for (let t = 0; t < times; t++) {
          possiblyInvalidIdStr = possiblyInvalidIdStr + pattern;
        }

        const possiblyInvalidId = parseInt(possiblyInvalidIdStr);
        if (
          possiblyInvalidIdStr.length > length ||
          i !== possiblyInvalidId ||
          added
        ) {
          continue;
        }

        sum += possiblyInvalidId;
        added = true;
      }
    }
  }

  return sum;
}
