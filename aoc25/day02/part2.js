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

      const div = Math.floor(idStr.length / 2);
      const halfId = idStr.substring(0, div);
      let added = false;
      for (let k = div - 1; k >= 0; k--) {
        const times = Math.floor(length / (k + 1));
        let possiblyInvalidIdStr = "";
        for (let v = 0; v < times; v++) {
          possiblyInvalidIdStr =
            possiblyInvalidIdStr + halfId.substring(0, k + 1);
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
