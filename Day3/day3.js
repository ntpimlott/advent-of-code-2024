const fs = require("fs");

function part1() {
  const input = fs.readFileSync(
    "./input.txt",
    "utf-8"
  );

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const current = input.indexOf("mul(", i);
    if (current !== -1) {
      const next = input.indexOf(")", current);
      if (next !== -1 && next - current > 2) {
        const values = input.slice(current + 4, next).split(",");
        if (!isNaN(values[0]) && !isNaN(values[1]) && values.length === 2) {
          const mulRes = parseInt(values[0]) * parseInt(values[1]);
          result += mulRes;
        }
      }
      i = current;
    }
  }
  console.log("Part 1: ", result);
}

function part2() {
  const input = fs.readFileSync(
    "./input.txt",
    "utf-8"
  );

  let result = 0;
  let currentStatus = true;

  for (let i = 0; i < input.length; i++) {
    const current = input.indexOf("mul(", i);
    const statusString = input.slice(i, current);

    const dontStatus = statusString.lastIndexOf("don't()");
    const doStatus = statusString.lastIndexOf("do()");

    if(dontStatus !== -1){
        currentStatus = false;
    }
    if(doStatus !== -1){
        currentStatus = true;
    }

    if (current !== -1 && currentStatus) {
      const next = input.indexOf(")", current);
      if (next !== -1 && next - current > 2) {
        const values = input.slice(current + 4, next).split(",");
        if (!isNaN(values[0]) && !isNaN(values[1]) && values.length === 2 && currentStatus) {
          const mulRes = parseInt(values[0]) * parseInt(values[1]);
          result += mulRes;
        }
      }
      i = current;
    }
  }
  console.log("Part 2: ", result);
}

part1();
part2();
