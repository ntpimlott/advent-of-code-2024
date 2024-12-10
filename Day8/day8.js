const fs = require("fs");

function isValidCoord(i, j, height, width, input, key){
    if(i < height && i>=0 && j>=0 && j<width && input[i].charAt(j) !== key){
        return true;
    }
    else{
        return false;
    }
}

function addAntinode(i, j, antinodeMap){
    if(antinodeMap.has(i)){
        let temp = antinodeMap.get(i);
        if(!temp.includes(j)){
            temp.push(j);
        }
    }
    else{
        antinodeMap.set(i, [j]);
    }
}

function part1() {
  let input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");


    const frequencies = new Map();
    input.map((value, index) => {
        for(let i = 0;i<value.length;i++){
            const currVal = value.charAt(i);
            if(currVal !== "."){
                if(frequencies.has(currVal)){
                    let arrayOfLocations = frequencies.get(currVal);
                    arrayOfLocations.push({firstIndex: index, secondIndex: i});
                }
                else{
                    frequencies.set(currVal, [{firstIndex: index, secondIndex: i}]);
                }
            }
        }
    });

    const height = input.length;
    const width = input[0].length;
    const antiNodeLocations = new Map();


    frequencies.forEach((values, key) => {
        for(let i = 0;i<values.length;i++){
            const currLocation = values[i];
            for(let j = i+1;j<values.length;j++){
                //Find distance between currLocation and nextLocation
                const nextLocation = values[j];
                const vertDiff = nextLocation.firstIndex - currLocation.firstIndex;
                const horzDiff = nextLocation.secondIndex - currLocation.secondIndex;

                if(Math.sign(vertDiff) && Math.sign(horzDiff)){
                    if(isValidCoord(currLocation.firstIndex - vertDiff, currLocation.secondIndex - horzDiff, height, width, input, key)){
                        addAntinode(currLocation.firstIndex - vertDiff, currLocation.secondIndex - horzDiff, antiNodeLocations);
                    }
                    if(isValidCoord(nextLocation.firstIndex + vertDiff, nextLocation.secondIndex + horzDiff, height, width, input, key)){
                        addAntinode(nextLocation.firstIndex + vertDiff, nextLocation.secondIndex + horzDiff, antiNodeLocations);
                    }
                }
                else if(!Math.sign(vertDiff) && Math.sign(horzDiff)){
                    if(isValidCoord(currLocation.firstIndex + vertDiff, currLocation.secondIndex - horzDiff, height, width, input, key)){
                        addAntinode(currLocation.firstIndex + vertDiff, currLocation.secondIndex - horzDiff, antiNodeLocations);
                    }
                    if(isValidCoord(nextLocation.firstIndex - vertDiff, nextLocation.secondIndex + horzDiff, height, width, input, key)){
                        addAntinode(nextLocation.firstIndex - vertDiff, nextLocation.secondIndex + horzDiff, antiNodeLocations);
                    }
                }
                else if(!Math.sign(vertDiff) && !Math.sign(horzDiff)){
                    if(isValidCoord(currLocation.firstIndex + vertDiff, currLocation.secondIndex + horzDiff, height, width, input, key)){
                        addAntinode(currLocation.firstIndex + vertDiff, currLocation.secondIndex + horzDiff, antiNodeLocations);
                    }
                    if(isValidCoord(nextLocation.firstIndex - vertDiff, nextLocation.secondIndex - horzDiff, height, width, input, key)){
                        addAntinode(nextLocation.firstIndex - vertDiff, nextLocation.secondIndex - horzDiff, antiNodeLocations);
                    }
                }
                else if(Math.sign(vertDiff) && !Math.sign(horzDiff)){
                    if(isValidCoord(currLocation.firstIndex - vertDiff, currLocation.secondIndex + horzDiff, height, width, input, key)){
                        addAntinode(currLocation.firstIndex - vertDiff, currLocation.secondIndex + horzDiff, antiNodeLocations);
                    }
                    if(isValidCoord(nextLocation.firstIndex + vertDiff, nextLocation.secondIndex - horzDiff, height, width, input, key)){
                        addAntinode(nextLocation.firstIndex + vertDiff, nextLocation.secondIndex - horzDiff, antiNodeLocations);
                    }
                }
            }
        }
    });

    let result = 0;


    antiNodeLocations.forEach((values) => {
        for(let i = 0;i<values.length;i++){
            result++;
        }
    });

    console.log("Part 1: ", result);
}

function part2(){
    let input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");
}

part1();
part2();
    