const fs = require("fs");

function part1() {
  let input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");

    input = input.map((row) => {
        return row.split("");
    });

    //Find Guard
    let currentLocation = {
        firstIndex: 0,
        secondIndex: 0
    };

    loop1:
    for(let i = 0;i<input.length;i++){
        loop2:
        for(let j = 0;j<input[i].length;j++){
            if(input[i][j].indexOf("v") !== -1 || input[i][j].indexOf("^") !== -1 || input[i][j].indexOf("<") !== -1 || input[i][j].indexOf(">") !== -1){
                currentLocation.firstIndex = i;
                currentLocation.secondIndex = j;
                break loop1;
            }  
        }
    }

    let leftArea = false;
    const distinctArea = new Set();
    const distinctAreaMap = new Map();
    distinctArea.add(input[currentLocation.firstIndex, currentLocation.secondIndex]);
    // let i = 0;

    while(leftArea !== true){
        //Check for Up Direction
        if(input[currentLocation.firstIndex][currentLocation.secondIndex]==="^"){
            if(currentLocation.firstIndex-1 < 0){
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                leftArea = true;
                break;
            }
            // console.log("^");
            if(input[currentLocation.firstIndex-1][currentLocation.secondIndex] === "#"){
                input[currentLocation.firstIndex][currentLocation.secondIndex] = ">";
                distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
            }
            else if(input[currentLocation.firstIndex-1][currentLocation.secondIndex] === "."){
                input[currentLocation.firstIndex-1][currentLocation.secondIndex] = "^";
                input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
                distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                currentLocation.firstIndex = currentLocation.firstIndex-1;
            }
        }
        // Check Down Direction
        if(input[currentLocation.firstIndex][currentLocation.secondIndex]==="v"){
            if(currentLocation.firstIndex+1 > input.length-1){
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                leftArea = true;
                break;
            }
            if(input[currentLocation.firstIndex+1][currentLocation.secondIndex] === "#"){
                input[currentLocation.firstIndex][currentLocation.secondIndex] = "<";
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
            }
            else if(input[currentLocation.firstIndex+1][currentLocation.secondIndex] === "."){
                input[currentLocation.firstIndex+1][currentLocation.secondIndex] = "v";
                input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
                distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);

                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                currentLocation.firstIndex = currentLocation.firstIndex+1;
            }
        }
        // Check Left Direction
        if(input[currentLocation.firstIndex][currentLocation.secondIndex]==="<"){
            if(currentLocation.secondIndex-1 < 0){
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                leftArea = true;
                break;
            }
            if(input[currentLocation.firstIndex][currentLocation.secondIndex-1] === "#"){
                input[currentLocation.firstIndex][currentLocation.secondIndex] = "^";
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
            }
            else if(input[currentLocation.firstIndex][currentLocation.secondIndex-1] === "."){
                input[currentLocation.firstIndex][currentLocation.secondIndex-1] = "<";
                input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
                distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);

                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                currentLocation.secondIndex = currentLocation.secondIndex-1;
            }
        }
        // Check Right Direction
        if(input[currentLocation.firstIndex][currentLocation.secondIndex]===">"){
            if(currentLocation.secondIndex+1 > input[currentLocation.firstIndex].length-1){
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                leftArea = true;
                break;
            }
            if(input[currentLocation.firstIndex][currentLocation.secondIndex+1] === "#"){
                input[currentLocation.firstIndex][currentLocation.secondIndex] = "v";
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                // distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
            }
            else if(input[currentLocation.firstIndex][currentLocation.secondIndex+1] === "."){
                input[currentLocation.firstIndex][currentLocation.secondIndex+1] = ">";
                input[currentLocation.firstIndex][currentLocation.secondIndex] = ".";
                distinctArea.add([currentLocation.firstIndex, currentLocation.secondIndex]);
                
                if(distinctAreaMap.has(currentLocation.firstIndex)){
                    const area = distinctAreaMap.get(currentLocation.firstIndex);
                    if(!area.includes(currentLocation.secondIndex)){
                        area.push(currentLocation.secondIndex);
                    }
                }
                else{
                    distinctAreaMap.set(currentLocation.firstIndex, [currentLocation.secondIndex]);
                }
                currentLocation.secondIndex = currentLocation.secondIndex+1;
            }
        }
    }

    let result = 0;
    distinctAreaMap.forEach((value, key) => {
        for(let i = 0;i<value.length;i++){
            result++;
        }
    });

  console.log("Part 1: ", result);
//   console.log("Part 1: ", distinctArea);
}

function part2() {
  const input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");
    console.log("Part 2: ");
}

part1();
part2();
