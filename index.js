// type 'node index.js 10' in terminal where 10 is the limit of records

`use-strict`;
const fs = require("fs");
const path = require("path");
const process = require("process");

const aliceFile = fs.readFileSync(
  path.resolve(__dirname, "./alice_in_wonderland.txt"),
  "utf8"
);
const excluded = fs.readFileSync(
  path.resolve(__dirname, "./1-1000.txt"),
  "utf8"
);

let aliceArray = aliceFile
  .trim()
  .replace(/[^\w\s]/gi, "")
  .replace(/\n/g, " ")
  .split(" ");

let excludedArray = excluded.trim().replace(/\n/g, " ").split(" ");
let totalRecords = Number(process.argv.pop());

const getMostRepeated = (totalRecords) => {
  aliceArray = aliceArray.filter((item) => item !== "");
  let tempObj = {};
  let count = 0;
  // let tempObj = [];

  aliceArray.map((word) => {
    if (!excludedArray.includes(word)) {
      if (!tempObj[word]) {
        tempObj[word] = count + 1;
      } else if (tempObj[word]) {
        tempObj[word] = parseInt(tempObj[word] + 1);
      }
    }
  });

  let newObj = Object.entries(tempObj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, totalRecords);
  return newObj.reduce((acc, [k, v]) => ((acc[k] = v), acc), {});
};

console.table(getMostRepeated(totalRecords));
