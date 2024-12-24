const fs = require("fs");

function part1() {
  const input = fs.readFileSync("./input.txt", "utf-8").split("\n").map(BigInt);

  for (let i = 0; i < 2000; i++) {
    for (let j = 0; j < input.length; j++) {
      let curr = input[j];
      curr = curr * BigInt(64);
      curr = input[j] ^ curr;
      curr = curr % BigInt(16777216);

      input[j] = curr;
      curr = Math.floor(Number(curr / BigInt(32)));
      curr = input[j] ^ BigInt(curr);
      curr = curr % BigInt(16777216);

      input[j] = curr;
      curr = curr * BigInt(2048);
      curr = input[j] ^ curr;
      curr = curr % BigInt(16777216);

      input[j] = curr;
    }
  }

  let result = 0;
  for (let i = 0; i < input.length; i++) {
    input[i] = Number(input[i]);
    result = result + input[i];
  }
  console.log("Part 1: ", result);
}

function part2() {
    const input = fs.readFileSync("./test.txt", "utf-8").split("\n").map(BigInt);

  console.log("Part 2: ");
}

part1();
part2();
