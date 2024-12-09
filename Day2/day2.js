const fs = require("fs");

function part1() {
  const rows = [];
  let safeReports = 0;

  const input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");

  input.forEach((string) => {
    const splitInput = string.split(" ");
    const numberConversion = splitInput.map((string) => parseInt(string));
    rows.push(numberConversion);
  });

  for (let i = 0; i < rows.length - 1; i++) {
    const currentRow = rows[i];
    let result = currentRow.reduce(
      (isSafe, currentValue, currentIndex, arr) => {
        const difference = Math.abs(arr[currentIndex - 1] - currentValue);
        return (
          isSafe &&
          (currentIndex === 0 || arr[currentIndex - 1] <= currentValue) &&
          (currentIndex === 0 || (difference <= 3 && difference !== 0))
        );
      }
    );

    if (!result) {
      result = currentRow.reduce((isSafe, currentValue, currentIndex, arr) => {
        const difference = Math.abs(arr[currentIndex - 1] - currentValue);
        return (
          isSafe &&
          (currentIndex === 0 || arr[currentIndex - 1] >= currentValue) &&
          (currentIndex === 0 || (difference <= 3 && difference !== 0))
        );
      });
    }
    if (result) {
      safeReports++;
    }
  }

  console.log("Part 1: Safe Reports: ", safeReports);
}

function checkCondition(currentRow) {
  let result = true;
  for (let j = 1; j < currentRow.length; j++) {
    const difference = Math.abs(currentRow[j - 1] - currentRow[j]);
    if (
      currentRow[j - 1] > currentRow[j] ||
      difference > 3 ||
      difference === 0
    ) {
      result = false;
    }
  }
  if (!result) {
    result = true;
    for (let j = 1; j < currentRow.length; j++) {
      const difference = Math.abs(currentRow[j - 1] - currentRow[j]);
      if (
        currentRow[j - 1] < currentRow[j] ||
        difference > 3 ||
        difference === 0
      ) {
        result = false;
      }
    }
  }
  return result;
}

function spliceIndex(currentRow, index) {
  return currentRow.toSpliced(index, 1);
}

function part2() {
  const rows = [];
  const results = [];
  let safeReports = 0;

  const input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");

  input.forEach((string) => {
    const splitInput = string.split(" ");
    const numberConversion = splitInput.map((string) => parseInt(string));
    rows.push(numberConversion);
  });

  for (let i = 0; i < rows.length - 1; i++) {
    const currentRow = rows[i];
    results.push(checkCondition(currentRow));
  }

  for (let i = 0; i < rows.length - 1; i++) {
    let currentRow = rows[i];
    let currentResult = false;
    if (results[i] === false) {
      for (let j = 0; j < currentRow.length; j++) {
        let ascendSplice = spliceIndex(currentRow, j);
        currentResult = checkCondition(ascendSplice);

        if (!results[i]) {
          results[i] = currentResult;
        }
      }
    }
  }

  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      safeReports++;
    }
  }

  console.log("Part 2: Safe Reports: ", safeReports);
}

part1();
part2();
