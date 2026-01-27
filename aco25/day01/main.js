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
  const array = await readFile("example.txt");
  console.log(array);
}

main();
