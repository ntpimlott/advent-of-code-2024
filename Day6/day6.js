const fs = require("fs");

function part1() {
  let input = fs.readFileSync("./input2.txt", "utf-8").split("\n");

  input = input.map((row) => {
    return row.split("");
  });

  //Find Guard
  let currentLocation = {
    firstIndex: 0,
    secondIndex: 0,
  };

  loop1: for (let i = 0; i < input.length; i++) {
    loop2: for (let j = 0; j < input[i].length; j++) {
      if (
        input[i][j].indexOf("v") !== -1 ||
        input[i][j].indexOf("^") !== -1 ||
        input[i][j].indexOf("<") !== -1 ||
        input[i][j].indexOf(">") !== -1
      ) {
        currentLocation.firstIndex = i;
        currentLocation.secondIndex = j;
        break loop1;
      }
    }
  }

  let leftArea = false;
  const distinctArea = new Set();
  const distinctAreaMap = new Map();
  distinctArea.add(
    input[(currentLocation.firstIndex, currentLocation.secondIndex)]
  );
  // let i = 0;

  while (leftArea !== true) {
    //Check for Up Direction
    if (
      input[currentLocation.firstIndex][currentLocation.secondIndex] === "^"
    ) {
      if (currentLocation.firstIndex - 1 < 0) {
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        leftArea = true;
        break;
      }
      // console.log("^");
      if (
        input[currentLocation.firstIndex - 1][currentLocation.secondIndex] ===
        "#"
      ) {
        input[currentLocation.firstIndex][currentLocation.secondIndex] = ">";
        distinctArea.add([
          currentLocation.firstIndex,
          currentLocation.secondIndex,
        ]);
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        }
      } else if (
        input[currentLocation.firstIndex - 1][currentLocation.secondIndex] ===
        "."
      ) {
        input[currentLocation.firstIndex - 1][currentLocation.secondIndex] =
          "^";
        input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
        distinctArea.add([
          currentLocation.firstIndex,
          currentLocation.secondIndex,
        ]);
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        currentLocation.firstIndex = currentLocation.firstIndex - 1;
      }
    }
    // Check Down Direction
    if (
      input[currentLocation.firstIndex][currentLocation.secondIndex] === "v"
    ) {
      if (currentLocation.firstIndex + 1 > input.length - 1) {
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        leftArea = true;
        break;
      }
      if (
        input[currentLocation.firstIndex + 1][currentLocation.secondIndex] ===
        "#"
      ) {
        input[currentLocation.firstIndex][currentLocation.secondIndex] = "<";
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        }
        // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
      } else if (
        input[currentLocation.firstIndex + 1][currentLocation.secondIndex] ===
        "."
      ) {
        input[currentLocation.firstIndex + 1][currentLocation.secondIndex] =
          "v";
        input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
        distinctArea.add([
          currentLocation.firstIndex,
          currentLocation.secondIndex,
        ]);

        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        currentLocation.firstIndex = currentLocation.firstIndex + 1;
      }
    }
    // Check Left Direction
    if (
      input[currentLocation.firstIndex][currentLocation.secondIndex] === "<"
    ) {
      if (currentLocation.secondIndex - 1 < 0) {
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        leftArea = true;
        break;
      }
      if (
        input[currentLocation.firstIndex][currentLocation.secondIndex - 1] ===
        "#"
      ) {
        input[currentLocation.firstIndex][currentLocation.secondIndex] = "^";
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        }
        // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
      } else if (
        input[currentLocation.firstIndex][currentLocation.secondIndex - 1] ===
        "."
      ) {
        input[currentLocation.firstIndex][currentLocation.secondIndex - 1] =
          "<";
        input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
        distinctArea.add([
          currentLocation.firstIndex,
          currentLocation.secondIndex,
        ]);

        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        currentLocation.secondIndex = currentLocation.secondIndex - 1;
      }
    }
    // Check Right Direction
    if (
      input[currentLocation.firstIndex][currentLocation.secondIndex] === ">"
    ) {
      if (
        currentLocation.secondIndex + 1 >
        input[currentLocation.firstIndex].length - 1
      ) {
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        leftArea = true;
        break;
      }
      if (
        input[currentLocation.firstIndex][currentLocation.secondIndex + 1] ===
        "#"
      ) {
        input[currentLocation.firstIndex][currentLocation.secondIndex] = "v";
        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        }
        // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
      } else if (
        input[currentLocation.firstIndex][currentLocation.secondIndex + 1] ===
        "."
      ) {
        input[currentLocation.firstIndex][currentLocation.secondIndex + 1] =
          ">";
        input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
        distinctArea.add([
          currentLocation.firstIndex,
          currentLocation.secondIndex,
        ]);

        if (distinctAreaMap.has(currentLocation.firstIndex)) {
          const area = distinctAreaMap.get(currentLocation.firstIndex);
          if (!area.includes(currentLocation.secondIndex)) {
            area.push(currentLocation.secondIndex);
          }
        } else {
          distinctAreaMap.set(currentLocation.firstIndex, [
            currentLocation.secondIndex,
          ]);
        }
        currentLocation.secondIndex = currentLocation.secondIndex + 1;
      }
    }
  }

  let result = 0;
  distinctAreaMap.forEach((value, key) => {
    for (let i = 0; i < value.length; i++) {
      result++;
    }
  });

  console.log("Part 1: ", result);
  return distinctAreaMap;
  //   console.log("Part 1: ", distinctArea);
}

function part2() {
  let input = fs.readFileSync("./input2.txt", "utf-8").split("\n");

  input = input.map((row) => {
    return row.split("");
  });

  //Find Guard
  let currentLocation = {
    firstIndex: 0,
    secondIndex: 0,
  };

  let firstValue = 0;
  let secondValue = 0;

  loop1: for (let i = 0; i < input.length; i++) {
    loop2: for (let j = 0; j < input[i].length; j++) {
      if (
        input[i][j].indexOf("v") !== -1 ||
        input[i][j].indexOf("^") !== -1 ||
        input[i][j].indexOf("<") !== -1 ||
        input[i][j].indexOf(">") !== -1
      ) {
        currentLocation.firstIndex = i;
        firstValue = i;
        currentLocation.secondIndex = j;
        secondValue = j;
        break loop1;
      }
    }
  }

  let listPossibleObstructions = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if ((i !== firstValue && j !== secondValue) && input[i][j] !== "#") {
        listPossibleObstructions.push({ firstIndex: i, secondIndex: j });
      }
    }
  }
  // possibleObstructionLocations.forEach((value, key) => {
  //     for(let i = 0;i<value.length;i++){
  //         if(currentLocation.firstIndex !== key && currentLocation.secondIndex !== value[i]){
  //             listPossibleObstructions.push({firstIndex: key, secondIndex:value[i]});
  //         }
  //     }
  // });

  let checkLoop = false;
  const distinctArea = new Set();
  const distinctAreaMap = new Map();
  let loopCheckMap = new Map();
  // const staticCurrentLocation = {firstIndex: currentLocation.firstIndex, secondIndex: currentLocation.secondIndex};
  // loopCheckMap.add(input[currentLocation.firstIndex, currentLocation.secondIndex]);
  let result = 0;
  let leftArea = false;

  for (let i = 0; i < listPossibleObstructions.length; i++) {
    input[listPossibleObstructions[i].firstIndex][
      listPossibleObstructions[i].secondIndex
    ] = "#";
    loop2: while (leftArea !== true) {
      //Check for Up Direction
    //   console.log(currentLocation);
      if (
        input[currentLocation.firstIndex][currentLocation.secondIndex] === "^"
      ) {
        if (currentLocation.firstIndex - 1 < 0) {
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          leftArea = true;
          break loop2;
        }
        // console.log("^");
        if (
          input[currentLocation.firstIndex - 1][currentLocation.secondIndex] ===
          "#"
        ) {
          input[currentLocation.firstIndex][currentLocation.secondIndex] = ">";
          distinctArea.add([
            currentLocation.firstIndex,
            currentLocation.secondIndex,
          ]);
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          }
        } else if (
          input[currentLocation.firstIndex - 1][currentLocation.secondIndex] ===
          "."
        ) {
          input[currentLocation.firstIndex - 1][currentLocation.secondIndex] =
            "^";
          input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
          distinctArea.add([
            currentLocation.firstIndex,
            currentLocation.secondIndex,
          ]);
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          currentLocation.firstIndex = currentLocation.firstIndex - 1;
        }
      }
      // Check Down Direction
      if (
        input[currentLocation.firstIndex][currentLocation.secondIndex] === "v"
      ) {
        if (currentLocation.firstIndex + 1 > input.length - 1) {
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          leftArea = true;
          break loop2;
        }
        if (
          input[currentLocation.firstIndex + 1][currentLocation.secondIndex] ===
          "#"
        ) {
          input[currentLocation.firstIndex][currentLocation.secondIndex] = "<";
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          }
          // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
        } else if (
          input[currentLocation.firstIndex + 1][currentLocation.secondIndex] ===
          "."
        ) {
          input[currentLocation.firstIndex + 1][currentLocation.secondIndex] =
            "v";
          input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
          distinctArea.add([
            currentLocation.firstIndex,
            currentLocation.secondIndex,
          ]);

          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          currentLocation.firstIndex = currentLocation.firstIndex + 1;
        }
      }
      // Check Left Direction
      if (
        input[currentLocation.firstIndex][currentLocation.secondIndex] === "<"
      ) {
        if (currentLocation.secondIndex - 1 < 0) {
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          leftArea = true;
          break loop2;
        }
        if (
          input[currentLocation.firstIndex][currentLocation.secondIndex - 1] ===
          "#"
        ) {
          input[currentLocation.firstIndex][currentLocation.secondIndex] = "^";
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          }
          // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
        } else if (
          input[currentLocation.firstIndex][currentLocation.secondIndex - 1] ===
          "."
        ) {
          input[currentLocation.firstIndex][currentLocation.secondIndex - 1] =
            "<";
          input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
          distinctArea.add([
            currentLocation.firstIndex,
            currentLocation.secondIndex,
          ]);

          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          currentLocation.secondIndex = currentLocation.secondIndex - 1;
        }
      }
      // Check Right Direction
      if (
        input[currentLocation.firstIndex][currentLocation.secondIndex] === ">"
      ) {
        if (
          currentLocation.secondIndex + 1 >
          input[currentLocation.firstIndex].length - 1
        ) {
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          leftArea = true;
          break loop2;
        }
        if (
          input[currentLocation.firstIndex][currentLocation.secondIndex + 1] ===
          "#"
        ) {
          input[currentLocation.firstIndex][currentLocation.secondIndex] = "v";
          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          }
          // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
        } else if (
          input[currentLocation.firstIndex][currentLocation.secondIndex + 1] ===
          "."
        ) {
          input[currentLocation.firstIndex][currentLocation.secondIndex + 1] =
            ">";
          input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
          distinctArea.add([
            currentLocation.firstIndex,
            currentLocation.secondIndex,
          ]);

          if (distinctAreaMap.has(currentLocation.firstIndex)) {
            const area = distinctAreaMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
            }
          } else {
            distinctAreaMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
          currentLocation.secondIndex = currentLocation.secondIndex + 1;
        }
        if (loopCheckMap.has(currentLocation.firstIndex)) {
            const area = loopCheckMap.get(currentLocation.firstIndex);
            if (!area.includes(currentLocation.secondIndex)) {
              area.push(currentLocation.secondIndex);
              checkLoop = false;
            } else {
              // console.log("test");
              if (!checkLoop) {
                checkLoop = true;
              } else {
                result++;
                break loop2;
              }
            }
          } else {
            loopCheckMap.set(currentLocation.firstIndex, [
              currentLocation.secondIndex,
            ]);
          }
      }
    }
    leftArea = false;
    checkLoop = false;
    loopCheckMap.clear();
    distinctArea.clear();
    distinctAreaMap.clear();
    // console.log(currentLocation);
    // console.log(staticCurrentLocation);

    // currentLocation.firstIndex = firstValue;
    // currentLocation.secondIndex = secondValue;
    input = fs.readFileSync("./input2.txt", "utf-8").split("\n");

    input = input.map((row) => {
      return row.split("");
    });

    // console.log(i);

  loop1: for (let i = 0; i < input.length; i++) {
    loop2: for (let j = 0; j < input[i].length; j++) {
      if (
        input[i][j].indexOf("v") !== -1 ||
        input[i][j].indexOf("^") !== -1 ||
        input[i][j].indexOf("<") !== -1 ||
        input[i][j].indexOf(">") !== -1
      ) {
        currentLocation.firstIndex = i;
        firstValue = i;
        currentLocation.secondIndex = j;
        secondValue = j;
        break loop1;
      }
    }
  }

    // console.log(currentLocation);
    // input[listPossibleObstructions[i].firstIndex][
    //   listPossibleObstructions[i].secondIndex
    // ] = ".";
  }

  // console.log(listPossibleObstructions);

  console.log("Part 2: ", result);
}

part1();
part2();
